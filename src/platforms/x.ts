import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface XConfig {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

export class XUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('x', credentials, logger);
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
        return createUploadResult(false, { error: 'Invalid X/Twitter credentials' });
      }

      const videoBlob = await this.fetchVideo(videoUrl);
      const hashtags = this.formatHashtags(metadata.hashtags);
      const tweetText = this.truncateDescription(
        `${metadata.description}\n\n${hashtags.join(' ')}`
      );

      await this.logger.info('x', 'Uploading media to X', {
        size: videoBlob.size,
        textLength: tweetText.length
      });

      const initResponse = await fetch('https://upload.twitter.com/1.1/media/upload.json', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          command: 'INIT',
          total_bytes: videoBlob.size.toString(),
          media_type: 'video/mp4',
          media_category: 'tweet_video'
        })
      });

      if (!initResponse.ok) {
        const error = await initResponse.text();
        return createUploadResult(false, { 
          error: `X media upload init failed: ${error}`,
          errorCode: initResponse.status.toString()
        });
      }

      const initResult = await initResponse.json() as { media_id_string: string };
      const mediaId = initResult.media_id_string;

      const tweetResponse = await fetch('https://api.twitter.com/2/tweets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: tweetText,
          media: {
            media_ids: [mediaId]
          }
        })
      });

      if (!tweetResponse.ok) {
        const error = await tweetResponse.text();
        return createUploadResult(false, { 
          error: `X tweet creation failed: ${error}`,
          errorCode: tweetResponse.status.toString()
        });
      }

      const tweetResult = await tweetResponse.json() as { data: { id: string } };
      const tweetUrl = `https://x.com/i/status/${tweetResult.data.id}`;

      await this.logUploadSuccess(tweetResult.data.id, tweetUrl);
      return createUploadResult(true, { videoId: tweetResult.data.id, url: tweetUrl });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
