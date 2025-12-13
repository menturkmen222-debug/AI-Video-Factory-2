import { Logger } from '../utils/logger';
import { Platform } from '../config/channels';

export interface VerificationResult {
  platform: Platform;
  success: boolean;
  videoId?: string;
  url?: string;
  status: 'verified' | 'pending' | 'failed' | 'not_found';
  message: string;
  checkedAt: string;
}

export interface PlatformCredentials {
  youtube?: {
    accessToken: string;
  };
  tiktok?: {
    accessToken: string;
    openId: string;
  };
  instagram?: {
    accessToken: string;
  };
  facebook?: {
    accessToken: string;
  };
}

export class UploadVerificationService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async verifyUpload(
    platform: Platform,
    videoId: string,
    credentials: PlatformCredentials
  ): Promise<VerificationResult> {
    await this.logger.info('verification', `Verifying upload on ${platform}`, { videoId });

    try {
      switch (platform) {
        case 'youtube':
          return await this.verifyYouTube(videoId, credentials.youtube?.accessToken);
        case 'tiktok':
          return await this.verifyTikTok(videoId, credentials.tiktok);
        case 'instagram':
          return await this.verifyInstagram(videoId, credentials.instagram?.accessToken);
        case 'facebook':
          return await this.verifyFacebook(videoId, credentials.facebook?.accessToken);
        default:
          return this.createResult(platform, false, 'not_found', 'Unknown platform');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('verification', `Verification failed for ${platform}`, { error: errorMessage });
      return this.createResult(platform, false, 'failed', errorMessage);
    }
  }

  private async verifyYouTube(
    videoId: string,
    accessToken?: string
  ): Promise<VerificationResult> {
    if (!accessToken) {
      return this.createResult('youtube', false, 'failed', 'No access token');
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=status,snippet&id=${videoId}`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );

      if (!response.ok) {
        return this.createResult('youtube', false, 'failed', `API error: ${response.status}`);
      }

      const data = await response.json() as { items?: Array<{ id: string; status: { uploadStatus: string } }> };
      
      if (!data.items || data.items.length === 0) {
        return this.createResult('youtube', false, 'not_found', 'Video not found');
      }

      const video = data.items[0];
      const uploadStatus = video.status?.uploadStatus;

      if (uploadStatus === 'processed' || uploadStatus === 'uploaded') {
        return this.createResult(
          'youtube',
          true,
          'verified',
          'Video successfully uploaded and processing',
          videoId,
          `https://www.youtube.com/watch?v=${videoId}`
        );
      }

      return this.createResult('youtube', true, 'pending', `Video status: ${uploadStatus}`, videoId);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return this.createResult('youtube', false, 'failed', msg);
    }
  }

  private async verifyTikTok(
    videoId: string,
    credentials?: { accessToken: string; openId: string }
  ): Promise<VerificationResult> {
    if (!credentials) {
      return this.createResult('tiktok', false, 'failed', 'No credentials');
    }

    try {
      const response = await fetch(
        `https://open.tiktokapis.com/v2/video/query/?fields=id,create_time,share_url`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${credentials.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filters: { video_ids: [videoId] }
          })
        }
      );

      if (response.ok) {
        const data = await response.json() as { data?: { videos?: Array<{ share_url: string }> } };
        if (data.data?.videos?.length) {
          return this.createResult(
            'tiktok',
            true,
            'verified',
            'Video found on TikTok',
            videoId,
            data.data.videos[0].share_url
          );
        }
      }

      return this.createResult('tiktok', true, 'pending', 'Video upload initiated');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return this.createResult('tiktok', false, 'failed', msg);
    }
  }

  private async verifyInstagram(
    videoId: string,
    accessToken?: string
  ): Promise<VerificationResult> {
    if (!accessToken) {
      return this.createResult('instagram', false, 'failed', 'No access token');
    }

    try {
      const response = await fetch(
        `https://graph.instagram.com/${videoId}?fields=id,media_type,permalink&access_token=${accessToken}`
      );

      if (response.ok) {
        const data = await response.json() as { id: string; permalink?: string };
        return this.createResult(
          'instagram',
          true,
          'verified',
          'Video found on Instagram',
          data.id,
          data.permalink
        );
      }

      return this.createResult('instagram', true, 'pending', 'Video processing');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return this.createResult('instagram', false, 'failed', msg);
    }
  }

  private async verifyFacebook(
    videoId: string,
    accessToken?: string
  ): Promise<VerificationResult> {
    if (!accessToken) {
      return this.createResult('facebook', false, 'failed', 'No access token');
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${videoId}?fields=id,status,permalink_url&access_token=${accessToken}`
      );

      if (response.ok) {
        const data = await response.json() as { id: string; permalink_url?: string; status?: { video_status: string } };
        const status = data.status?.video_status;
        
        if (status === 'ready') {
          return this.createResult(
            'facebook',
            true,
            'verified',
            'Video ready on Facebook',
            data.id,
            data.permalink_url
          );
        }

        return this.createResult('facebook', true, 'pending', `Video status: ${status}`, data.id);
      }

      return this.createResult('facebook', false, 'not_found', 'Video not found');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      return this.createResult('facebook', false, 'failed', msg);
    }
  }

  private createResult(
    platform: Platform,
    success: boolean,
    status: VerificationResult['status'],
    message: string,
    videoId?: string,
    url?: string
  ): VerificationResult {
    return {
      platform,
      success,
      videoId,
      url,
      status,
      message,
      checkedAt: new Date().toISOString()
    };
  }

  async verifyAllPlatforms(
    uploads: Array<{ platform: Platform; videoId: string }>,
    credentials: PlatformCredentials
  ): Promise<VerificationResult[]> {
    await this.logger.info('verification', 'Starting multi-platform verification', {
      platformCount: uploads.length
    });

    const results = await Promise.all(
      uploads.map(upload => this.verifyUpload(upload.platform, upload.videoId, credentials))
    );

    const verified = results.filter(r => r.status === 'verified').length;
    const pending = results.filter(r => r.status === 'pending').length;
    const failed = results.filter(r => r.status === 'failed').length;

    await this.logger.info('verification', 'Multi-platform verification complete', {
      verified,
      pending,
      failed
    });

    return results;
  }
}
