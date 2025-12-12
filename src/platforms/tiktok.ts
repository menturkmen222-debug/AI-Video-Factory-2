import { Logger } from '../utils/logger';
import { VideoMetadata } from '../db/queue';

export interface TikTokConfig {
  accessToken: string;
  openId: string;
}

export interface TikTokUploadResult {
  success: boolean;
  videoId?: string;
  shareUrl?: string;
  error?: string;
}

interface InitUploadResponse {
  data: {
    upload_url: string;
    video_id: string;
  };
  error: {
    code: string;
    message: string;
  };
}

interface PublishResponse {
  data: {
    share_id: string;
  };
  error: {
    code: string;
    message: string;
  };
}

export class TikTokUploader {
  private config: TikTokConfig;
  private logger: Logger;
  private baseUrl = 'https://open.tiktokapis.com/v2';

  constructor(config: TikTokConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  async upload(videoUrl: string, metadata: VideoMetadata, channelId: string): Promise<TikTokUploadResult> {
    await this.logger.info('tiktok', 'Starting TikTok upload', { channelId, title: metadata.title });

    try {
      const videoResponse = await fetch(videoUrl);
      if (!videoResponse.ok) {
        throw new Error('Failed to fetch video from URL');
      }
      const videoBuffer = await videoResponse.arrayBuffer();
      const videoSize = videoBuffer.byteLength;

      const initResponse = await fetch(`${this.baseUrl}/post/publish/video/init/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post_info: {
            title: metadata.title,
            privacy_level: 'PUBLIC_TO_EVERYONE',
            disable_duet: false,
            disable_comment: false,
            disable_stitch: false,
            video_cover_timestamp_ms: 1000
          },
          source_info: {
            source: 'FILE_UPLOAD',
            video_size: videoSize,
            chunk_size: videoSize,
            total_chunk_count: 1
          }
        })
      });

      if (!initResponse.ok) {
        const error = await initResponse.text();
        throw new Error(`TikTok init failed: ${error}`);
      }

      const initData = await initResponse.json() as InitUploadResponse;
      
      if (initData.error?.code) {
        throw new Error(`TikTok API error: ${initData.error.message}`);
      }

      const { upload_url, video_id } = initData.data;

      const uploadResponse = await fetch(upload_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Length': videoSize.toString(),
          'Content-Range': `bytes 0-${videoSize - 1}/${videoSize}`
        },
        body: videoBuffer
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.text();
        throw new Error(`TikTok upload failed: ${error}`);
      }

      const publishResponse = await fetch(`${this.baseUrl}/post/publish/status/fetch/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          publish_id: video_id
        })
      });

      let shareUrl: string | undefined;
      if (publishResponse.ok) {
        const publishData = await publishResponse.json() as PublishResponse;
        if (publishData.data?.share_id) {
          shareUrl = `https://www.tiktok.com/@${this.config.openId}/video/${publishData.data.share_id}`;
        }
      }

      await this.logger.info('tiktok', 'Upload successful', { videoId: video_id });

      return {
        success: true,
        videoId: video_id,
        shareUrl
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('tiktok', 'Upload failed', { error: errorMessage });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
