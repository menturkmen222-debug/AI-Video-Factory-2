import { Logger } from '../utils/logger';
import { PlatformId, getPlatformById, PlatformConfig } from '../config/platforms';
import { PlatformMetadata } from '../models/videoTemplate';

export interface UploadResult {
  success: boolean;
  videoId?: string;
  url?: string;
  error?: string;
  errorCode?: string;
}

export interface PlatformCredentials {
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
  userId?: string;
  pageId?: string;
  openId?: string;
  [key: string]: string | undefined;
}

export interface VideoValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export abstract class BasePlatformUploader {
  protected platformId: PlatformId;
  protected config: PlatformConfig;
  protected credentials: PlatformCredentials;
  protected logger: Logger;

  constructor(platformId: PlatformId, credentials: PlatformCredentials, logger: Logger) {
    this.platformId = platformId;
    this.credentials = credentials;
    this.logger = logger;
    
    const config = getPlatformById(platformId);
    if (!config) {
      throw new Error(`Unknown platform: ${platformId}`);
    }
    this.config = config;
  }

  abstract upload(videoUrl: string, metadata: PlatformMetadata, channelId: string): Promise<UploadResult>;

  abstract validateCredentials(): Promise<boolean>;

  validateMetadata(metadata: PlatformMetadata): VideoValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (this.config.maxTitleLength > 0 && metadata.title.length > this.config.maxTitleLength) {
      errors.push(`Title exceeds max length: ${metadata.title.length}/${this.config.maxTitleLength}`);
    }

    if (metadata.description.length > this.config.maxDescriptionLength) {
      errors.push(`Description exceeds max length: ${metadata.description.length}/${this.config.maxDescriptionLength}`);
    }

    if (metadata.hashtags.length > this.config.maxHashtags) {
      warnings.push(`Too many hashtags: ${metadata.hashtags.length}/${this.config.maxHashtags} (will be truncated)`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  async validateBeforeUpload(metadata: PlatformMetadata): Promise<{ canUpload: boolean; metadata: PlatformMetadata; errors: string[] }> {
    const validation = this.validateMetadata(metadata);
    
    if (!validation.valid) {
      return {
        canUpload: false,
        metadata,
        errors: validation.errors
      };
    }

    const sanitizedMetadata: PlatformMetadata = {
      title: this.truncateTitle(metadata.title),
      description: this.truncateDescription(metadata.description),
      hashtags: this.formatHashtags(metadata.hashtags),
      cta: metadata.cta,
      aspectRatio: metadata.aspectRatio || this.config.defaultAspectRatio
    };

    return {
      canUpload: true,
      metadata: sanitizedMetadata,
      errors: []
    };
  }

  protected async fetchVideo(videoUrl: string): Promise<Blob> {
    const response = await fetch(videoUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.status}`);
    }
    return response.blob();
  }

  protected truncateTitle(title: string): string {
    if (this.config.maxTitleLength === 0) return '';
    if (title.length <= this.config.maxTitleLength) return title;
    return title.substring(0, this.config.maxTitleLength - 3) + '...';
  }

  protected truncateDescription(description: string): string {
    if (description.length <= this.config.maxDescriptionLength) return description;
    return description.substring(0, this.config.maxDescriptionLength - 3) + '...';
  }

  protected formatHashtags(hashtags: string[]): string[] {
    return hashtags
      .slice(0, this.config.maxHashtags)
      .map(tag => {
        const cleanTag = tag.startsWith('#') ? tag : `#${tag}`;
        if (this.config.maxHashtagLength > 0 && cleanTag.length > this.config.maxHashtagLength) {
          return cleanTag.substring(0, this.config.maxHashtagLength);
        }
        return cleanTag;
      });
  }

  protected async logUploadStart(channelId: string, title: string): Promise<void> {
    await this.logger.info(this.platformId, 'Starting upload', { 
      channelId, 
      title: title.substring(0, 50) 
    });
  }

  protected async logUploadSuccess(videoId: string, url: string): Promise<void> {
    await this.logger.info(this.platformId, 'Upload successful', { videoId, url });
  }

  protected async logUploadError(error: string): Promise<void> {
    await this.logger.error(this.platformId, 'Upload failed', { error });
  }
}

export function createUploadResult(
  success: boolean,
  data?: { videoId?: string; url?: string; error?: string; errorCode?: string }
): UploadResult {
  return {
    success,
    ...data
  };
}
