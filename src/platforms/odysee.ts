import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface OdyseeConfig {
  authToken: string;
  channelName: string;
}

export class OdyseeUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('odysee', credentials, logger);
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
        return createUploadResult(false, { error: 'Invalid Odysee/LBRY credentials' });
      }

      const videoBlob = await this.fetchVideo(videoUrl);
      const title = this.truncateTitle(metadata.title);
      const description = this.truncateDescription(metadata.description);
      const hashtags = this.formatHashtags(metadata.hashtags);

      await this.logger.info('odysee', 'Publishing to Odysee/LBRY', {
        title,
        size: videoBlob.size
      });

      const response = await fetch('https://api.lbry.com/publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          title: title,
          description: `${description}\n\n${hashtags.join(' ')}`,
          file_path: videoUrl,
          channel_name: this.credentials.pageId || 'default',
          bid: '0.001'
        })
      });

      if (!response.ok) {
        const error = await response.text();
        return createUploadResult(false, { 
          error: `Odysee API error: ${error}`,
          errorCode: response.status.toString()
        });
      }

      const result = await response.json() as { result: { claim_id: string; outputs: Array<{ claim_id: string }> } };
      const claimId = result.result?.claim_id || result.result?.outputs?.[0]?.claim_id;
      const videoUrl2 = `https://odysee.com/${claimId}`;

      await this.logUploadSuccess(claimId, videoUrl2);
      return createUploadResult(true, { videoId: claimId, url: videoUrl2 });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
