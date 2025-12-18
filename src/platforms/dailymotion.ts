import { Logger } from '../utils/logger';
import { PlatformMetadata } from '../models/videoTemplate';
import { BasePlatformUploader, UploadResult, PlatformCredentials, createUploadResult } from './base';

export interface DailymotionConfig {
  accessToken: string;
  userId: string;
}

export class DailymotionUploader extends BasePlatformUploader {
  constructor(credentials: PlatformCredentials, logger: Logger) {
    super('dailymotion', credentials, logger);
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
        return createUploadResult(false, { error: 'Invalid Dailymotion credentials' });
      }

      const title = this.truncateTitle(metadata.title);
      const description = this.truncateDescription(metadata.description);
      const hashtags = this.formatHashtags(metadata.hashtags);

      const uploadUrlResponse = await fetch('https://api.dailymotion.com/file/upload', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`
        }
      });

      if (!uploadUrlResponse.ok) {
        const error = await uploadUrlResponse.text();
        return createUploadResult(false, { 
          error: `Failed to get upload URL: ${error}`,
          errorCode: uploadUrlResponse.status.toString()
        });
      }

      const uploadData = await uploadUrlResponse.json() as { upload_url: string };
      const uploadUrl = uploadData.upload_url;

      const videoBlob = await this.fetchVideo(videoUrl);
      const formData = new FormData();
      formData.append('file', videoBlob, 'video.mp4');

      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.text();
        return createUploadResult(false, { 
          error: `Video upload failed: ${error}`,
          errorCode: uploadResponse.status.toString()
        });
      }

      const uploadResult = await uploadResponse.json() as { url: string };

      const publishResponse = await fetch('https://api.dailymotion.com/me/videos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          url: uploadResult.url,
          title: title,
          description: `${description}\n\n${hashtags.join(' ')}`,
          channel: 'shortfilms',
          published: 'true'
        })
      });

      if (!publishResponse.ok) {
        const error = await publishResponse.text();
        return createUploadResult(false, { 
          error: `Publish failed: ${error}`,
          errorCode: publishResponse.status.toString()
        });
      }

      const result = await publishResponse.json() as { id: string };
      const videoUrlResult = `https://www.dailymotion.com/video/${result.id}`;

      await this.logUploadSuccess(result.id, videoUrlResult);
      return createUploadResult(true, { videoId: result.id, url: videoUrlResult });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logUploadError(errorMessage);
      return createUploadResult(false, { error: errorMessage });
    }
  }
}
