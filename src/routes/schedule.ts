// src/routes/schedule.ts
import { Logger } from '../utils/logger';
import { QueueManager, VideoQueueEntry, Platform, VideoStatus } from '../db/queue';
import { GroqService } from '../services/groq';
import { YouTubeUploader, YouTubeConfig } from '../platforms/youtube';
import { TikTokUploader, TikTokConfig } from '../platforms/tiktok';
import { InstagramUploader, InstagramConfig } from '../platforms/instagram';
import { FacebookUploader, FacebookConfig } from '../platforms/facebook';
import { getChannelCredentials, ChannelEnvVars, ChannelPlatformConfigs } from '../config/channels';

export interface ScheduleResult {
  success: boolean;
  processed: number;
  uploaded: number;
  failed: number;
  skipped: number;
  details: Array<{
    id: string;
    platforms: Platform[];
    status: VideoStatus;
    errors?: Partial<Record<Platform, string>>;
  }>;
}

export interface PlatformConfigs {
  youtube?: YouTubeConfig;
  tiktok?: TikTokConfig;
  instagram?: InstagramConfig;
  facebook?: FacebookConfig;
}

export async function handleSchedule(
  queueManager: QueueManager,
  groqService: GroqService,
  platformConfigs: PlatformConfigs,
  logger: Logger,
  env?: ChannelEnvVars
): Promise<Response> {
  await logger.info('schedule', 'Scheduler run started');

  const result: ScheduleResult = {
    success: true,
    processed: 0,
    uploaded: 0,
    failed: 0,
    skipped: 0,
    details: []
  };

  try {
    const pendingVideos = await queueManager.getPendingVideos(10);
    
    if (pendingVideos.length === 0) {
      await logger.info('schedule', 'No pending videos to process');
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('schedule', `Processing ${pendingVideos.length} pending videos`);

    const uploadPromises = pendingVideos.map(async (video) => {
      return processVideo(video, queueManager, groqService, platformConfigs, logger, env);
    });

    const results = await Promise.allSettled(uploadPromises);

    for (const res of results) {
      result.processed++;
      
      if (res.status === 'fulfilled') {
        const detail = res.value;
        result.details.push(detail);
        
        // Barcha platformalar uchun muvaffaqiyat — uploaded
        // Agar bittasi ham ishlamasa — failed
        // Qolgan hollarda — uploaded (qisman muvaffaqiyat)
        if (detail.status === 'uploaded') {
          result.uploaded++;
        } else {
          result.failed++;
        }
      } else {
        result.failed++;
        result.details.push({
          id: 'unknown',
          platforms: ['youtube'],
          status: 'failed',
          errors: { youtube: res.reason?.message || 'Unknown error' }
        });
      }
    }

    await logger.info('schedule', 'Scheduler run completed', {
      processed: result.processed,
      uploaded: result.uploaded,
      failed: result.failed,
      skipped: result.skipped
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('schedule', 'Scheduler run failed', { error: errorMessage });

    return new Response(JSON.stringify({
      ...result,
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function processVideo(
  video: VideoQueueEntry,
  queueManager: QueueManager,
  groqService: GroqService,
  platformConfigs: PlatformConfigs,
  logger: Logger,
  env?: ChannelEnvVars
): Promise<{ id: string; platforms: Platform[]; status: VideoStatus; errors?: Partial<Record<Platform, string>> }> {
  const { id, platforms, channelId, cloudinaryUrl } = video;

  await logger.info('schedule', `Processing video ${id} for channel ${channelId}`, { platforms: platforms.join(', ') });

  try {
    // Get channel-specific credentials (falls back to global if env provided)
    let channelCreds: ChannelPlatformConfigs = {};
    if (env) {
      channelCreds = getChannelCredentials(channelId, env);
      await logger.info('schedule', `Loaded credentials for channel ${channelId}`, {
        youtube: !!channelCreds.youtube,
        tiktok: !!channelCreds.tiktok,
        instagram: !!channelCreds.instagram,
        facebook: !!channelCreds.facebook
      });
    }

    // Daily limit check
    let hasUploadable = false;
    for (const platform of platforms) {
      if (await queueManager.canUpload(platform, channelId)) {
        hasUploadable = true;
        break;
      }
    }

    if (!hasUploadable) {
      await logger.warn('schedule', `All platforms skipped due to daily limit for ${channelId}`);
      return { id, platforms, status: 'skipped' };
    }

    await queueManager.updateEntry(id, { status: 'processing' });

    // Initialize each platform's status to 'uploading'
    for (const platform of platforms) {
      await queueManager.updatePlatformStatus(id, platform, { status: 'uploading' });
    }

    // AI metadata — generated once using the prompt and channel name
    let metadata = video.metadata;
    if (!metadata || !metadata.title) {
      await logger.info('schedule', 'Generating AI metadata', { id, context: video.videoContext, channel: channelId });
      metadata = await groqService.generateMetadata(video.videoContext, channelId);
      await queueManager.updateEntry(id, { metadata });
    }

    const errors: Partial<Record<Platform, string>> = {};
    let allSucceeded = true;

    for (const platform of platforms) {
      const canUpload = await queueManager.canUpload(platform, channelId);
      if (!canUpload) {
        errors[platform] = 'Daily limit reached';
        allSucceeded = false;
        await queueManager.updatePlatformStatus(id, platform, {
          status: 'skipped',
          error: 'Daily limit reached'
        });
        await logger.warn('schedule', `Platform ${platform} skipped - daily limit reached`, { channelId });
        continue;
      }

      let uploadResult: { success: boolean; error?: string };

      try {
        await logger.info('schedule', `Starting upload to ${platform}`, { id, channelId });
        
        switch (platform) {
          case 'youtube':
            // Use channel-specific credentials if available, otherwise use global
            const ytConfig = channelCreds.youtube || platformConfigs.youtube;
            if (ytConfig) {
              const uploader = new YouTubeUploader(ytConfig, logger);
              uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
            } else {
              uploadResult = { success: false, error: 'YouTube not configured' };
            }
            break;
          case 'tiktok':
            const ttConfig = channelCreds.tiktok || platformConfigs.tiktok;
            if (ttConfig) {
              const uploader = new TikTokUploader(ttConfig, logger);
              uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
            } else {
              uploadResult = { success: false, error: 'TikTok not configured' };
            }
            break;
          case 'instagram':
            const igConfig = channelCreds.instagram || platformConfigs.instagram;
            if (igConfig) {
              const uploader = new InstagramUploader(igConfig, logger);
              uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
            } else {
              uploadResult = { success: false, error: 'Instagram not configured' };
            }
            break;
          case 'facebook':
            const fbConfig = channelCreds.facebook || platformConfigs.facebook;
            if (fbConfig) {
              const uploader = new FacebookUploader(fbConfig, logger);
              uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
            } else {
              uploadResult = { success: false, error: 'Facebook not configured' };
            }
            break;
          default:
            uploadResult = { success: false, error: `Unsupported platform: ${platform}` };
        }

        if (uploadResult.success) {
          await queueManager.incrementDailyCounter(platform, channelId);
          await queueManager.updatePlatformStatus(id, platform, {
            status: 'completed',
            uploadedAt: new Date().toISOString(),
            platformVideoId: (uploadResult as any).videoId || undefined,
            platformUrl: (uploadResult as any).url || undefined
          });
          await logger.info('schedule', `Upload to ${platform} successful`, { id, channelId });
        } else {
          errors[platform] = uploadResult.error || 'Unknown upload error';
          allSucceeded = false;
          await queueManager.updatePlatformStatus(id, platform, {
            status: 'failed',
            error: uploadResult.error || errors[platform] || 'Unknown error',
            errorCode: (uploadResult as any).errorCode || undefined
          });
          await logger.error('schedule', `Upload to ${platform} failed`, { id, channelId, error: uploadResult.error });
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unexpected error';
        errors[platform] = msg;
        allSucceeded = false;
        await queueManager.updatePlatformStatus(id, platform, {
          status: 'failed',
          error: msg
        });
        await logger.error('schedule', `Upload to ${platform} exception`, { id, channelId, error: msg });
      }
    }

    const finalStatus: VideoStatus = allSucceeded ? 'uploaded' : 'failed';

    await queueManager.updateEntry(id, { status: finalStatus });
    await logger.info('schedule', `Video ${id} processing complete`, { status: finalStatus, channelId });

    const result: any = { id, platforms, status: finalStatus };
    if (Object.keys(errors).length > 0) {
      result.errors = errors;
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await queueManager.updateEntry(id, { 
      status: 'failed',
      errorMessage,
      retryCount: (video.retryCount || 0) + 1
    });
    await logger.error('schedule', `Video ${id} processing error`, { error: errorMessage });
    return { id, platforms, status: 'failed', errors: { youtube: errorMessage } };
  }
}

export interface ImmediateRetryResult {
  success: boolean;
  videoId: string;
  platform: Platform;
  status: 'uploading' | 'completed' | 'failed';
  error?: string;
  errorCode?: string;
  platformVideoId?: string;
  platformUrl?: string;
}

export async function handleRetryImmediateUpload(
  request: Request,
  queueManager: QueueManager,
  groqService: GroqService,
  platformConfigs: PlatformConfigs,
  logger: Logger,
  env?: ChannelEnvVars
): Promise<Response> {
  try {
    const body = await request.json() as { videoId?: string; platform?: string };
    const { videoId, platform } = body;

    if (!videoId || !platform) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: videoId and platform'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const validPlatforms: Platform[] = ['youtube', 'tiktok', 'instagram', 'facebook'];
    if (!validPlatforms.includes(platform as Platform)) {
      return new Response(JSON.stringify({
        success: false,
        error: `Invalid platform. Must be one of: ${validPlatforms.join(', ')}`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const entry = await queueManager.getEntry(videoId);
    if (!entry) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Video not found in queue'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!entry.platformStatuses[platform as Platform]) {
      return new Response(JSON.stringify({
        success: false,
        error: `Platform ${platform} not found in video queue entry`
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('schedule', 'Starting immediate retry upload', { 
      videoId, 
      platform,
      retryAttempt: (entry.retryCount || 0) + 1
    });

    await queueManager.updatePlatformStatus(videoId, platform as Platform, { status: 'uploading' });

    const result = await performImmediateUpload(
      entry,
      platform as Platform,
      queueManager,
      groqService,
      platformConfigs,
      logger,
      env
    );

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('schedule', 'Immediate retry failed', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function performImmediateUpload(
  video: VideoQueueEntry,
  platform: Platform,
  queueManager: QueueManager,
  groqService: GroqService,
  platformConfigs: PlatformConfigs,
  logger: Logger,
  env?: ChannelEnvVars
): Promise<ImmediateRetryResult> {
  const { id, channelId, cloudinaryUrl } = video;

  try {
    let channelCreds: ChannelPlatformConfigs = {};
    if (env) {
      channelCreds = getChannelCredentials(channelId, env);
    }

    const canUpload = await queueManager.canUpload(platform, channelId);
    if (!canUpload) {
      const error = 'Daily upload limit reached for this platform';
      await queueManager.updatePlatformStatus(id, platform, {
        status: 'failed',
        error,
        retryAttempt: new Date().toISOString()
      });
      await logger.warn('schedule', `Immediate retry failed - daily limit`, { id, platform, channelId });
      return {
        success: false,
        videoId: id,
        platform,
        status: 'failed',
        error
      };
    }

    let metadata = video.metadata;
    if (!metadata || !metadata.title) {
      await logger.info('schedule', 'Generating AI metadata for retry', { id, channel: channelId });
      metadata = await groqService.generateMetadata(video.videoContext, channelId);
      await queueManager.updateEntry(id, { metadata });
    }

    let uploadResult: { success: boolean; error?: string; videoId?: string; url?: string; errorCode?: string };

    await logger.info('schedule', `Starting immediate upload to ${platform}`, { id, channelId });

    switch (platform) {
      case 'youtube':
        const ytConfig = channelCreds.youtube || platformConfigs.youtube;
        if (ytConfig) {
          const uploader = new YouTubeUploader(ytConfig, logger);
          uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
        } else {
          uploadResult = { success: false, error: 'YouTube not configured' };
        }
        break;
      case 'tiktok':
        const ttConfig = channelCreds.tiktok || platformConfigs.tiktok;
        if (ttConfig) {
          const uploader = new TikTokUploader(ttConfig, logger);
          uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
        } else {
          uploadResult = { success: false, error: 'TikTok not configured' };
        }
        break;
      case 'instagram':
        const igConfig = channelCreds.instagram || platformConfigs.instagram;
        if (igConfig) {
          const uploader = new InstagramUploader(igConfig, logger);
          uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
        } else {
          uploadResult = { success: false, error: 'Instagram not configured' };
        }
        break;
      case 'facebook':
        const fbConfig = channelCreds.facebook || platformConfigs.facebook;
        if (fbConfig) {
          const uploader = new FacebookUploader(fbConfig, logger);
          uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
        } else {
          uploadResult = { success: false, error: 'Facebook not configured' };
        }
        break;
      default:
        uploadResult = { success: false, error: `Unsupported platform: ${platform}` };
    }

    if (uploadResult.success) {
      await queueManager.incrementDailyCounter(platform, channelId);
      await queueManager.updatePlatformStatus(id, platform, {
        status: 'completed',
        uploadedAt: new Date().toISOString(),
        platformVideoId: uploadResult.videoId,
        platformUrl: uploadResult.url
      });
      await logger.info('schedule', `Immediate retry upload to ${platform} successful`, { id, channelId });

      const updatedEntry = await queueManager.getEntry(id);
      if (updatedEntry) {
        const allCompleted = Object.values(updatedEntry.platformStatuses).every(
          s => s.status === 'completed' || s.status === 'skipped'
        );
        if (allCompleted) {
          await queueManager.updateEntry(id, { status: 'uploaded' });
        }
      }

      return {
        success: true,
        videoId: id,
        platform,
        status: 'completed',
        platformVideoId: uploadResult.videoId,
        platformUrl: uploadResult.url
      };
    } else {
      await queueManager.updatePlatformStatus(id, platform, {
        status: 'failed',
        error: uploadResult.error || 'Unknown error',
        errorCode: uploadResult.errorCode,
        retryAttempt: new Date().toISOString()
      });
      await queueManager.updateEntry(id, { 
        retryCount: (video.retryCount || 0) + 1 
      });
      await logger.error('schedule', `Immediate retry upload to ${platform} failed`, { 
        id, 
        channelId, 
        error: uploadResult.error,
        retryCount: (video.retryCount || 0) + 1
      });

      return {
        success: false,
        videoId: id,
        platform,
        status: 'failed',
        error: uploadResult.error,
        errorCode: uploadResult.errorCode
      };
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unexpected error';
    await queueManager.updatePlatformStatus(id, platform, {
      status: 'failed',
      error: errorMessage,
      retryAttempt: new Date().toISOString()
    });
    await queueManager.updateEntry(id, { 
      retryCount: (video.retryCount || 0) + 1 
    });
    await logger.error('schedule', `Immediate retry exception for ${platform}`, { 
      id, 
      channelId, 
      error: errorMessage,
      retryCount: (video.retryCount || 0) + 1
    });

    return {
      success: false,
      videoId: id,
      platform,
      status: 'failed',
      error: errorMessage
    };
  }
}
