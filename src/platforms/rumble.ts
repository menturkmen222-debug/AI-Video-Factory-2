import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface RumbleConfig {
  apiKey: string;
  channelId: string;
}

export class RumbleUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('rumble', credentials, logger);
  }

  async validateCredentials(): Promise<boolean> {
    if (!this.credentials.apiKey) {
      return false;
    }
    return true;
  }

  async upload(videoUrl: string, metadata: PlatformMetadata, channelId: string): Promise<UploadResult> {
    await this.logUploadStart(channelId, metadata.title);

    try {
      if (!await this.validateCredentials()) {
        return createUploadResult(false, { error: 'Invalid Rumble credentials' });
      }

      const videoBlob = await this.fetchVideo(videoUrl);
      const title = this.truncateTitle(metadata.title);
      const description = this.truncateDescription(metadata.description);
      const hashtags = this.formatHashtags(metadata.hashtags);

      await this.logger.info('rumble', 'Uploading to Rumble', {
        title,
        size: videoBlob.size
      });

      const formData = new FormData();
      formData.append('video', videoBlob, 'video.mp4');
      formData.append('title', title);
      formData.append('description', `${description}\n\n${hashtags.join(' ')}`);

      const response = await fetch('https://rumble.com/api/v0/Media/Upload.php', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.apiKey}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.text();
        return createUploadResult(false, { 
          error: `Rumble API error: ${error}`,
          errorCode: response.status.toString()
        });
      }

      const result = await response.json() as { id: string; url: string };
      await this.logUploadSuccess(result.id, result.url);
      return createUploadResult(true, { videoId: result.id, url: result.url });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
