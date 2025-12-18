import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface TwitchConfig {
  accessToken: string;
  clientId: string;
  broadcasterId: string;
}

export class TwitchUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('twitch', credentials, logger);
  }

  async validateCredentials(): Promise<boolean> {
    if (!this.credentials.accessToken || !this.credentials.clientId) {
      return false;
    }
    return true;
  }

  async upload(videoUrl: string, metadata: PlatformMetadata, channelId: string): Promise<UploadResult> {
    await this.logUploadStart(channelId, metadata.title);

    try {
      if (!await this.validateCredentials()) {
        return createUploadResult(false, { error: 'Invalid Twitch credentials' });
      }

      const title = this.truncateTitle(metadata.title);

      await this.logger.info('twitch', 'Creating clip on Twitch', {
        title,
        channelId
      });

      return createUploadResult(false, { 
        error: 'Twitch Clips API requires active broadcast - upload pending' 
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
