import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface KwaiConfig {
  accessToken: string;
  appId: string;
  appSecret: string;
}

export class KwaiUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('kwai', credentials, logger);
  }

  async validateCredentials(): Promise<boolean> {
    if (!this.credentials.accessToken || !this.credentials.apiKey) {
      return false;
    }
    return true;
  }

  async upload(videoUrl: string, metadata: PlatformMetadata, channelId: string): Promise<UploadResult> {
    await this.logUploadStart(channelId, metadata.title);

    try {
      if (!await this.validateCredentials()) {
        return createUploadResult(false, { error: 'Invalid Kwai credentials' });
      }

      const videoBlob = await this.fetchVideo(videoUrl);
      const title = this.truncateTitle(metadata.title);
      const description = this.truncateDescription(metadata.description);

      await this.logger.info('kwai', 'Uploading to Kwai', {
        title,
        size: videoBlob.size
      });

      return createUploadResult(false, { 
        error: 'Kwai API integration pending - requires developer account approval' 
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
