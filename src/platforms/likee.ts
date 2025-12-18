import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface LikeeConfig {
  accessToken: string;
  userId: string;
}

export class LikeeUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('likee', credentials, logger);
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
        return createUploadResult(false, { error: 'Invalid Likee credentials' });
      }

      const videoBlob = await this.fetchVideo(videoUrl);
      const title = this.truncateTitle(metadata.title);

      await this.logger.info('likee', 'Uploading to Likee', {
        title,
        size: videoBlob.size
      });

      return createUploadResult(false, { 
        error: 'Likee API integration pending - requires partnership approval' 
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
