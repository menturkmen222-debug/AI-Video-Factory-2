import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface SnapchatConfig {
  accessToken: string;
  refreshToken?: string;
  adAccountId?: string;
}

export class SnapchatUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('snapchat', credentials, logger);
  }

  async validateCredentials(): Promise<boolean> {
    if (!this.credentials.accessToken) {
      return false;
    }
    return true;
  }

  async upload(videoUrl: string, metadata: PlatformMetadata, channelId: string): Promise<UploadResult> {
    await this.logUploadStart(channelId, metadata.title);

    try {
      if (!await this.validateCredentials()) {
        return createUploadResult(false, { error: 'Invalid Snapchat credentials' });
      }

      const videoBlob = await this.fetchVideo(videoUrl);

      await this.logger.info('snapchat', 'Uploading to Snapchat', {
        size: videoBlob.size,
        channelId
      });

      return createUploadResult(false, { 
        error: 'Snapchat API integration pending - requires Business Account setup' 
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
