import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface RedditConfig {
  clientId: string;
  clientSecret: string;
  accessToken: string;
  refreshToken: string;
  subreddit: string;
}

export class RedditUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('reddit', credentials, logger);
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
        return createUploadResult(false, { error: 'Invalid Reddit credentials' });
      }

      const title = this.truncateTitle(metadata.title);
      const subreddit = this.credentials.pageId || 'videos';

      const response = await fetch('https://oauth.reddit.com/api/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'AutoOZ/1.0'
        },
        body: new URLSearchParams({
          sr: subreddit,
          kind: 'link',
          title: title,
          url: videoUrl,
          resubmit: 'true',
          send_replies: 'true'
        })
      });

      if (!response.ok) {
        const error = await response.text();
        return createUploadResult(false, { 
          error: `Reddit API error: ${error}`,
          errorCode: response.status.toString()
        });
      }

      const result = await response.json() as { json: { data: { id: string; name: string } } };
      const postId = result.json.data.id;
      const postUrl = `https://www.reddit.com/r/${subreddit}/comments/${postId}`;

      await this.logUploadSuccess(postId, postUrl);
      return createUploadResult(true, { videoId: postId, url: postUrl });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
