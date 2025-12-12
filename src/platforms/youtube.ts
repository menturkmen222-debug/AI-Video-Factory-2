import { Logger } from '../utils/logger';
import { VideoMetadata } from '../db/queue';

export interface YouTubeConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export interface YouTubeUploadResult {
  success: boolean;
  videoId?: string;
  url?: string;
  error?: string;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export class YouTubeUploader {
  private config: YouTubeConfig;
  private logger: Logger;
  private accessToken: string | null = null;

  constructor(config: YouTubeConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  private async refreshAccessToken(): Promise<string> {
    await this.logger.info('youtube', 'Refreshing access token');

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: this.config.refreshToken,
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Token refresh failed: ${error}`);
      }

      const data = await response.json() as TokenResponse;
      this.accessToken = data.access_token;
      
      await this.logger.info('youtube', 'Access token refreshed successfully');
      return this.accessToken;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('youtube', 'Token refresh failed', { error: errorMessage });
      throw error;
    }
  }

  async upload(videoUrl: string, metadata: VideoMetadata, channelId: string): Promise<YouTubeUploadResult> {
    await this.logger.info('youtube', 'Starting YouTube upload', { channelId, title: metadata.title });

    try {
      if (!this.accessToken) {
        await this.refreshAccessToken();
      }

      const videoResponse = await fetch(videoUrl);
      if (!videoResponse.ok) {
        throw new Error('Failed to fetch video from URL');
      }
      const videoBlob = await videoResponse.blob();

      const uploadMetadata = {
        snippet: {
          title: metadata.title,
          description: metadata.description,
          tags: metadata.tags,
          categoryId: '22'
        },
        status: {
          privacyStatus: 'public',
          selfDeclaredMadeForKids: false
        }
      };

      const initResponse = await fetch(
        'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            'X-Upload-Content-Type': 'video/*',
            'X-Upload-Content-Length': videoBlob.size.toString()
          },
          body: JSON.stringify(uploadMetadata)
        }
      );

      if (!initResponse.ok) {
        const error = await initResponse.text();
        
        if (initResponse.status === 401) {
          await this.refreshAccessToken();
          return this.upload(videoUrl, metadata, channelId);
        }
        
        throw new Error(`Upload init failed: ${error}`);
      }

      const uploadUrl = initResponse.headers.get('Location');
      if (!uploadUrl) {
        throw new Error('No upload URL received');
      }

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'video/*',
          'Content-Length': videoBlob.size.toString()
        },
        body: videoBlob
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.text();
        throw new Error(`Video upload failed: ${error}`);
      }

      const result = await uploadResponse.json() as { id: string };
      const youtubeUrl = `https://www.youtube.com/watch?v=${result.id}`;

      await this.logger.info('youtube', 'Upload successful', { 
        videoId: result.id, 
        url: youtubeUrl 
      });

      return {
        success: true,
        videoId: result.id,
        url: youtubeUrl
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('youtube', 'Upload failed', { error: errorMessage });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
