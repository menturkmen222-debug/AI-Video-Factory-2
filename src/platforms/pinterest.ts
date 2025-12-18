import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface PinterestConfig {
  accessToken: string;
  boardId?: string;
}

export class PinterestUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('pinterest', credentials, logger);
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
        return createUploadResult(false, { error: 'Invalid Pinterest credentials' });
      }

      const title = this.truncateTitle(metadata.title);
      const description = this.truncateDescription(metadata.description);

      const response = await fetch('https://api.pinterest.com/v5/pins', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          media_source: {
            source_type: 'video_id',
            url: videoUrl
          },
          board_id: this.credentials.pageId
        })
      });

      if (!response.ok) {
        const error = await response.text();
        return createUploadResult(false, { 
          error: `Pinterest API error: ${error}`,
          errorCode: response.status.toString()
        });
      }

      const result = await response.json() as { id: string };
      const pinUrl = `https://www.pinterest.com/pin/${result.id}`;

      await this.logUploadSuccess(result.id, pinUrl);
      return createUploadResult(true, { videoId: result.id, url: pinUrl });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
