import { Logger } from '../utils/logger';
import { GroqService } from './groq';
import { LanguageAdapterService, AdaptationResult } from './languageAdapter';
import { MultiPlatformSchedulerService } from './multiPlatformScheduler';
import { LanguageCode, getLanguageByCode, getLanguageTimezone } from '../config/languages';
import { PlatformId, getPlatformById } from '../config/platforms';
import { CHANNEL_NAMES, VIDEOS_PER_DAY_PER_CHANNEL, TOTAL_CHANNELS, getChannelCredentials, ChannelEnvVars } from '../config/channels';
import { 
  VideoTemplate, 
  VideoAdaptation, 
  PublishTarget, 
  PlatformMetadata,
  createVideoTemplate,
  createVideoAdaptation,
  createPublishTarget
} from '../models/videoTemplate';
import { createPlatformUploader, PlatformCredentials } from '../platforms';
import { TemplatesManager } from '../db/templates';

export interface DistributionConfig {
  channelId: string;
  languageCodes: LanguageCode[];
  platformIds: PlatformId[];
  credentials: Record<string, PlatformCredentials>;
  env?: ChannelEnvVars;
}

export interface DistributionResult {
  success: boolean;
  templateId: string;
  totalTargets: number;
  successfulUploads: number;
  failedUploads: number;
  skippedUploads: number;
  adaptations: AdaptationResult[];
  targets: PublishTarget[];
  errors: string[];
  quotaStatus: Record<string, { used: number; remaining: number }>;
}

export class VideoDistributorService {
  private logger: Logger;
  private groqService: GroqService;
  private languageAdapter: LanguageAdapterService;
  private scheduler: MultiPlatformSchedulerService;
  private templatesManager?: TemplatesManager;

  constructor(groqService: GroqService, logger: Logger, templatesManager?: TemplatesManager) {
    this.logger = logger;
    this.groqService = groqService;
    this.languageAdapter = new LanguageAdapterService(groqService, logger);
    this.scheduler = new MultiPlatformSchedulerService(logger);
    this.templatesManager = templatesManager;
  }

  async distributeVideo(
    baseVideoUrl: string,
    basePrompt: string,
    config: DistributionConfig,
    baseContext?: string
  ): Promise<DistributionResult> {
    const result: DistributionResult = {
      success: true,
      templateId: '',
      totalTargets: 0,
      successfulUploads: 0,
      failedUploads: 0,
      skippedUploads: 0,
      adaptations: [],
      targets: [],
      errors: [],
      quotaStatus: {}
    };

    try {
      const validation = this.validateConfig(config);
      if (!validation.valid) {
        result.success = false;
        result.errors = validation.errors;
        return result;
      }

      const credentialValidation = this.validateCredentials(config);
      if (!credentialValidation.valid) {
        result.success = false;
        result.errors = credentialValidation.errors;
        return result;
      }

      const template = createVideoTemplate(
        baseVideoUrl,
        basePrompt,
        config.channelId,
        baseContext
      );
      result.templateId = template.id;

      if (this.templatesManager) {
        await this.templatesManager.saveTemplate(template);
      }

      await this.logger.info('distributor', 'Starting video distribution', {
        templateId: template.id,
        languages: config.languageCodes.length,
        platforms: config.platformIds.length
      });

      const channelInfo = CHANNEL_NAMES.find(ch => ch.id === config.channelId);
      const channelTopic = channelInfo?.topic;

      for (const languageCode of config.languageCodes) {
        if (this.templatesManager) {
          for (const platformId of config.platformIds) {
            const quotaCheck = await this.templatesManager.canUpload(
              config.channelId,
              languageCode,
              platformId
            );
            
            const quotaKey = `${config.channelId}/${languageCode}/${platformId}`;
            result.quotaStatus[quotaKey] = {
              used: VIDEOS_PER_DAY_PER_CHANNEL - quotaCheck.remaining,
              remaining: quotaCheck.remaining
            };

            if (!quotaCheck.allowed) {
              result.errors.push(quotaCheck.error || `Quota exceeded for ${quotaKey}`);
              result.skippedUploads++;
              continue;
            }
          }
        }

        const adaptation = await this.languageAdapter.adaptToLanguage({
          basePrompt,
          baseContext,
          targetLanguage: languageCode,
          channelId: config.channelId,
          channelTopic
        });

        result.adaptations.push(adaptation);

        if (!adaptation.success) {
          result.errors.push(`Language adaptation failed for ${languageCode}: ${adaptation.error}`);
          continue;
        }

        const videoAdaptation = createVideoAdaptation(
          template.id,
          languageCode,
          adaptation.title,
          adaptation.description,
          adaptation.hashtags,
          adaptation.cta
        );
        template.adaptations.push(videoAdaptation);

        for (const platformId of config.platformIds) {
          const channelCreds = config.env 
            ? getChannelCredentials(config.channelId, config.env)
            : {};
          
          const platformCreds = channelCreds[platformId as keyof typeof channelCreds] 
            || config.credentials[platformId];

          if (!platformCreds) {
            result.errors.push(`No credentials for ${platformId} on channel ${config.channelId}`);
            result.skippedUploads++;
            continue;
          }

          const platformMetadata = this.languageAdapter.adaptForPlatform(
            videoAdaptation,
            platformId
          );

          const uploader = createPlatformUploader(
            platformId,
            platformCreds as PlatformCredentials,
            this.logger
          );

          if (!uploader) {
            result.errors.push(`Platform ${platformId} is not enabled or misconfigured`);
            result.skippedUploads++;
            continue;
          }

          const credentialValid = await uploader.validateCredentials();
          if (!credentialValid) {
            result.errors.push(`Invalid credentials for ${platformId}`);
            result.skippedUploads++;
            continue;
          }

          const timezone = getLanguageTimezone(languageCode);
          const scheduledAt = new Date().toISOString();

          const target = createPublishTarget(
            template.id,
            platformId,
            languageCode,
            config.channelId,
            scheduledAt,
            timezone,
            platformMetadata
          );

          if (this.templatesManager) {
            await this.templatesManager.savePublishTarget(target);
          }

          try {
            target.status = 'uploading';
            if (this.templatesManager) {
              await this.templatesManager.updatePublishTarget(target.id, { status: 'uploading' });
            }

            const uploadResult = await uploader.upload(baseVideoUrl, platformMetadata, config.channelId);

            if (uploadResult.success) {
              target.status = 'published';
              target.publishedAt = new Date().toISOString();
              target.platformVideoId = uploadResult.videoId;
              target.platformUrl = uploadResult.url;
              result.successfulUploads++;

              if (this.templatesManager) {
                await this.templatesManager.incrementDailyQuota(
                  config.channelId,
                  languageCode,
                  platformId
                );
                await this.templatesManager.updatePublishTarget(target.id, {
                  status: 'published',
                  publishedAt: target.publishedAt,
                  platformVideoId: target.platformVideoId,
                  platformUrl: target.platformUrl
                });
              }

              await this.logger.info('distributor', 'Upload successful', {
                platformId,
                languageCode,
                videoId: uploadResult.videoId
              });
            } else {
              target.status = 'failed';
              target.error = uploadResult.error;
              target.retryCount++;
              result.failedUploads++;
              result.errors.push(`${platformId}/${languageCode}: ${uploadResult.error}`);

              if (this.templatesManager) {
                await this.templatesManager.updatePublishTarget(target.id, {
                  status: 'failed',
                  error: uploadResult.error,
                  retryCount: target.retryCount
                });
              }

              await this.logger.error('distributor', 'Upload failed', {
                platformId,
                languageCode,
                error: uploadResult.error
              });
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            target.status = 'failed';
            target.error = errorMessage;
            result.failedUploads++;
            result.errors.push(`${platformId}/${languageCode}: ${errorMessage}`);

            if (this.templatesManager) {
              await this.templatesManager.updatePublishTarget(target.id, {
                status: 'failed',
                error: errorMessage
              });
            }
          }

          result.targets.push(target);
          result.totalTargets++;
        }
      }

      if (this.templatesManager) {
        template.status = result.failedUploads === 0 ? 'published' : 'ready';
        await this.templatesManager.updateTemplate(template.id, { 
          status: template.status,
          adaptations: template.adaptations
        });
      }

      result.success = result.failedUploads === 0 && result.successfulUploads > 0;

      await this.logger.info('distributor', 'Distribution completed', {
        templateId: template.id,
        successful: result.successfulUploads,
        failed: result.failedUploads,
        skipped: result.skippedUploads
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      result.success = false;
      result.errors.push(errorMessage);
      await this.logger.error('distributor', 'Distribution failed', { error: errorMessage });
      return result;
    }
  }

  validateConfig(config: DistributionConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.channelId) {
      errors.push('Channel ID is required');
    } else if (!CHANNEL_NAMES.find(ch => ch.id === config.channelId)) {
      errors.push(`Invalid channel ID: ${config.channelId}`);
    }

    if (!config.languageCodes || config.languageCodes.length === 0) {
      errors.push('At least one language must be specified');
    } else {
      for (const lang of config.languageCodes) {
        if (!getLanguageByCode(lang)) {
          errors.push(`Invalid language code: ${lang}`);
        }
      }
    }

    if (!config.platformIds || config.platformIds.length === 0) {
      errors.push('At least one platform must be specified');
    } else {
      for (const platform of config.platformIds) {
        if (!getPlatformById(platform)) {
          errors.push(`Invalid platform ID: ${platform}`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  validateCredentials(config: DistributionConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const platformId of config.platformIds) {
      const channelCreds = config.env 
        ? getChannelCredentials(config.channelId, config.env)
        : {};
      
      const hasCreds = channelCreds[platformId as keyof typeof channelCreds] 
        || config.credentials[platformId];

      if (!hasCreds) {
        errors.push(`Missing credentials for platform: ${platformId}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  validateDailyStructure(): { valid: boolean; summary: DailyStructureSummary } {
    const summary: DailyStructureSummary = {
      totalChannels: TOTAL_CHANNELS,
      videosPerChannel: VIDEOS_PER_DAY_PER_CHANNEL,
      totalVideosPerDay: TOTAL_CHANNELS * VIDEOS_PER_DAY_PER_CHANNEL,
      expectedChannelCount: 5,
      expectedVideosPerDay: 25,
      isValid: true,
      errors: []
    };

    if (summary.totalChannels !== summary.expectedChannelCount) {
      summary.isValid = false;
      summary.errors.push(
        `Channel count mismatch: expected ${summary.expectedChannelCount}, got ${summary.totalChannels}`
      );
    }

    if (summary.totalVideosPerDay !== summary.expectedVideosPerDay) {
      summary.isValid = false;
      summary.errors.push(
        `Videos per day mismatch: expected ${summary.expectedVideosPerDay}, got ${summary.totalVideosPerDay}`
      );
    }

    return {
      valid: summary.isValid,
      summary
    };
  }

  async retryFailedUpload(
    target: PublishTarget,
    videoUrl: string,
    credentials: PlatformCredentials
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.logger.info('distributor', 'Retrying failed upload', {
        targetId: target.id,
        platformId: target.platformId
      });

      const uploader = createPlatformUploader(target.platformId, credentials, this.logger);
      if (!uploader) {
        return { success: false, error: 'Platform not available' };
      }

      const result = await uploader.upload(videoUrl, target.metadata, target.channelId);

      if (result.success && this.templatesManager) {
        await this.templatesManager.updatePublishTarget(target.id, {
          status: 'published',
          publishedAt: new Date().toISOString(),
          platformVideoId: result.videoId,
          platformUrl: result.url,
          error: undefined
        });
        await this.templatesManager.incrementDailyQuota(
          target.channelId,
          target.languageCode,
          target.platformId
        );
      }

      return {
        success: result.success,
        error: result.error
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }
}

export interface DailyStructureSummary {
  totalChannels: number;
  videosPerChannel: number;
  totalVideosPerDay: number;
  expectedChannelCount: number;
  expectedVideosPerDay: number;
  isValid: boolean;
  errors: string[];
}
