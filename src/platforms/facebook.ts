import { Logger } from '../utils/logger';
import { VideoMetadata } from '../db/queue';
import { sleep } from '../utils/time';

export interface FacebookConfig {
  accessToken: string;
  pageId: string;
}

export interface FacebookUploadResult {
  success: boolean;
  videoId?: string;
  postId?: string;
  permalink?: string;
  error?: string;
}

interface InitUploadResponse {
  video_id: string;
  upload_session_id: string;
  start_offset: string;
  end_offset: string;
}

interface UploadChunkResponse {
  start_offset: string;
  end_offset: string;
}

interface FinishUploadResponse {
  success: boolean;
  post_id?: string;
}

interface VideoDetailsResponse {
  permalink_url: string;
}

export class FacebookUploader {
  private config: FacebookConfig;
  private logger: Logger;
  private baseUrl = 'https://graph.facebook.com/v18.0';

  constructor(config: FacebookConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  async upload(videoUrl: string, metadata: VideoMetadata, channelId: string): Promise<FacebookUploadResult> {
    await this.logger.info('facebook', 'Starting Facebook Reels upload', { channelId, title: metadata.title });

    try {
      const videoResponse = await fetch(videoUrl);
      if (!videoResponse.ok) {
        throw new Error('Failed to fetch video from URL');
      }
      const videoBuffer = await videoResponse.arrayBuffer();
      const videoSize = videoBuffer.byteLength;

      const initResponse = await fetch(
        `${this.baseUrl}/${this.config.pageId}/video_reels`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            upload_phase: 'start',
            access_token: this.config.accessToken
          })
        }
      );

      if (!initResponse.ok) {
        const error = await initResponse.text();
        throw new Error(`Init upload failed: ${error}`);
      }

      const initData = await initResponse.json() as InitUploadResponse;
      const { video_id, upload_session_id } = initData;

      await this.logger.info('facebook', 'Upload session started', { videoId: video_id });

      const formData = new FormData();
      formData.append('access_token', this.config.accessToken);
      formData.append('upload_phase', 'transfer');
      formData.append('upload_session_id', upload_session_id);
      formData.append('start_offset', '0');
      formData.append('video_file_chunk', new Blob([videoBuffer], { type: 'video/mp4' }));

      const chunkResponse = await fetch(
        `${this.baseUrl}/${this.config.pageId}/video_reels`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!chunkResponse.ok) {
        const error = await chunkResponse.text();
        throw new Error(`Chunk upload failed: ${error}`);
      }

      const description = `${metadata.title}\n\n${metadata.description}\n\n${metadata.tags.map(t => `#${t}`).join(' ')}`;

      const finishResponse = await fetch(
        `${this.baseUrl}/${this.config.pageId}/video_reels`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            upload_phase: 'finish',
            upload_session_id,
            video_id,
            title: metadata.title,
            description: description.substring(0, 500),
            access_token: this.config.accessToken
          })
        }
      );

      if (!finishResponse.ok) {
        const error = await finishResponse.text();
        throw new Error(`Finish upload failed: ${error}`);
      }

      const finishData = await finishResponse.json() as FinishUploadResponse;

      await sleep(3000);

      let permalink: string | undefined;
      try {
        const videoDetailsResponse = await fetch(
          `${this.baseUrl}/${video_id}?fields=permalink_url&access_token=${this.config.accessToken}`
        );
        if (videoDetailsResponse.ok) {
          const videoDetails = await videoDetailsResponse.json() as VideoDetailsResponse;
          permalink = videoDetails.permalink_url;
        }
      } catch {
        await this.logger.warn('facebook', 'Could not fetch video permalink');
      }

      await this.logger.info('facebook', 'Upload successful', { 
        videoId: video_id, 
        postId: finishData.post_id 
      });

      return {
        success: true,
        videoId: video_id,
        postId: finishData.post_id,
        permalink
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('facebook', 'Upload failed', { error: errorMessage });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
