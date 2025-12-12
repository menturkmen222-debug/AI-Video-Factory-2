import { Logger } from '../utils/logger';
import { VideoMetadata } from '../db/queue';
import { sleep } from '../utils/time';

export interface InstagramConfig {
  accessToken: string;
  igUserId: string;
}

export interface InstagramUploadResult {
  success: boolean;
  mediaId?: string;
  permalink?: string;
  error?: string;
}

interface ContainerResponse {
  id: string;
}

interface StatusResponse {
  status_code: string;
  status?: string;
}

interface PublishResponse {
  id: string;
}

interface MediaResponse {
  permalink: string;
}

export class InstagramUploader {
  private config: InstagramConfig;
  private logger: Logger;
  private baseUrl = 'https://graph.facebook.com/v18.0';

  constructor(config: InstagramConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  async upload(videoUrl: string, metadata: VideoMetadata, channelId: string): Promise<InstagramUploadResult> {
    await this.logger.info('instagram', 'Starting Instagram Reels upload', { channelId, title: metadata.title });

    try {
      const caption = `${metadata.title}\n\n${metadata.description}\n\n${metadata.tags.map(t => `#${t}`).join(' ')}`;

      const containerResponse = await fetch(
        `${this.baseUrl}/${this.config.igUserId}/media`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            media_type: 'REELS',
            video_url: videoUrl,
            caption: caption.substring(0, 2200),
            share_to_feed: true,
            access_token: this.config.accessToken
          })
        }
      );

      if (!containerResponse.ok) {
        const error = await containerResponse.text();
        throw new Error(`Container creation failed: ${error}`);
      }

      const containerData = await containerResponse.json() as ContainerResponse;
      const containerId = containerData.id;

      await this.logger.info('instagram', 'Container created, waiting for processing', { containerId });

      let status = 'IN_PROGRESS';
      let attempts = 0;
      const maxAttempts = 30;

      while (status === 'IN_PROGRESS' && attempts < maxAttempts) {
        await sleep(5000);
        
        const statusResponse = await fetch(
          `${this.baseUrl}/${containerId}?fields=status_code,status&access_token=${this.config.accessToken}`
        );

        if (statusResponse.ok) {
          const statusData = await statusResponse.json() as StatusResponse;
          status = statusData.status_code;
          
          if (status === 'ERROR') {
            throw new Error(`Processing failed: ${statusData.status}`);
          }
        }
        
        attempts++;
      }

      if (status !== 'FINISHED') {
        throw new Error('Video processing timeout');
      }

      const publishResponse = await fetch(
        `${this.baseUrl}/${this.config.igUserId}/media_publish`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            creation_id: containerId,
            access_token: this.config.accessToken
          })
        }
      );

      if (!publishResponse.ok) {
        const error = await publishResponse.text();
        throw new Error(`Publish failed: ${error}`);
      }

      const publishData = await publishResponse.json() as PublishResponse;
      const mediaId = publishData.id;

      const mediaResponse = await fetch(
        `${this.baseUrl}/${mediaId}?fields=permalink&access_token=${this.config.accessToken}`
      );

      let permalink: string | undefined;
      if (mediaResponse.ok) {
        const mediaData = await mediaResponse.json() as MediaResponse;
        permalink = mediaData.permalink;
      }

      await this.logger.info('instagram', 'Upload successful', { mediaId, permalink });

      return {
        success: true,
        mediaId,
        permalink
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('instagram', 'Upload failed', { error: errorMessage });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
