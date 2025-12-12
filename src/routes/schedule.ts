import { Logger } from '../utils/logger';
import { QueueManager, VideoQueueEntry, Platform } from '../db/queue';
import { GroqService } from '../services/groq';
import { YouTubeUploader, YouTubeConfig } from '../platforms/youtube';
import { TikTokUploader, TikTokConfig } from '../platforms/tiktok';
import { InstagramUploader, InstagramConfig } from '../platforms/instagram';
import { FacebookUploader, FacebookConfig } from '../platforms/facebook';

export interface ScheduleResult {
  success: boolean;
  processed: number;
  uploaded: number;
  failed: number;
  skipped: number;
  details: Array<{
    id: string;
    platform: Platform;
    status: string;
    error?: string;
  }>;
}

export interface PlatformConfigs {
  youtube?: YouTubeConfig;
  tiktok?: TikTokConfig;
  instagram?: InstagramConfig;
  facebook?: FacebookConfig;
}

export async function handleSchedule(
  queueManager: QueueManager,
  groqService: GroqService,
  platformConfigs: PlatformConfigs,
  logger: Logger
): Promise<Response> {
  await logger.info('schedule', 'Scheduler run started');

  const result: ScheduleResult = {
    success: true,
    processed: 0,
    uploaded: 0,
    failed: 0,
    skipped: 0,
    details: []
  };

  try {
    const pendingVideos = await queueManager.getPendingVideos(10);
    
    if (pendingVideos.length === 0) {
      await logger.info('schedule', 'No pending videos to process');
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('schedule', `Processing ${pendingVideos.length} pending videos`);

    const uploadPromises = pendingVideos.map(async (video) => {
      return processVideo(video, queueManager, groqService, platformConfigs, logger);
    });

    const results = await Promise.allSettled(uploadPromises);

    for (const res of results) {
      result.processed++;
      
      if (res.status === 'fulfilled') {
        const detail = res.value;
        result.details.push(detail);
        
        if (detail.status === 'uploaded') {
          result.uploaded++;
        } else if (detail.status === 'failed') {
          result.failed++;
        } else if (detail.status === 'skipped') {
          result.skipped++;
        }
      } else {
        result.failed++;
        result.details.push({
          id: 'unknown',
          platform: 'youtube',
          status: 'failed',
          error: res.reason?.message || 'Unknown error'
        });
      }
    }

    await logger.info('schedule', 'Scheduler run completed', {
      processed: result.processed,
      uploaded: result.uploaded,
      failed: result.failed,
      skipped: result.skipped
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('schedule', 'Scheduler run failed', { error: errorMessage });

    return new Response(JSON.stringify({
      ...result,
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function processVideo(
  video: VideoQueueEntry,
  queueManager: QueueManager,
  groqService: GroqService,
  platformConfigs: PlatformConfigs,
  logger: Logger
): Promise<{ id: string; platform: Platform; status: string; error?: string }> {
  const { id, platform, channelId, cloudinaryUrl } = video;

  await logger.info('schedule', `Processing video ${id} for ${platform}`);

  try {
    const canUpload = await queueManager.canUpload(platform, channelId);
    
    if (!canUpload) {
      await logger.warn('schedule', `Daily limit reached for ${platform}/${channelId}`);
      return { id, platform, status: 'skipped', error: 'Daily limit reached' };
    }

    await queueManager.updateEntry(id, { status: 'processing' });

    let metadata = video.metadata;
    if (!metadata || !metadata.title) {
      await logger.info('schedule', 'Generating AI metadata', { id });
      metadata = await groqService.generateMetadata();
      await queueManager.updateEntry(id, { metadata });
    }

    let uploadResult: { success: boolean; error?: string };

    switch (platform) {
      case 'youtube':
        if (platformConfigs.youtube) {
          const youtubeUploader = new YouTubeUploader(platformConfigs.youtube, logger);
          uploadResult = await youtubeUploader.upload(cloudinaryUrl, metadata, channelId);
        } else {
          uploadResult = { success: false, error: 'YouTube not configured' };
        }
        break;

      case 'tiktok':
        if (platformConfigs.tiktok) {
          const tiktokUploader = new TikTokUploader(platformConfigs.tiktok, logger);
          uploadResult = await tiktokUploader.upload(cloudinaryUrl, metadata, channelId);
        } else {
          uploadResult = { success: false, error: 'TikTok not configured' };
        }
        break;

      case 'instagram':
        if (platformConfigs.instagram) {
          const instagramUploader = new InstagramUploader(platformConfigs.instagram, logger);
          uploadResult = await instagramUploader.upload(cloudinaryUrl, metadata, channelId);
        } else {
          uploadResult = { success: false, error: 'Instagram not configured' };
        }
        break;

      case 'facebook':
        if (platformConfigs.facebook) {
          const facebookUploader = new FacebookUploader(platformConfigs.facebook, logger);
          uploadResult = await facebookUploader.upload(cloudinaryUrl, metadata, channelId);
        } else {
          uploadResult = { success: false, error: 'Facebook not configured' };
        }
        break;

      default:
        uploadResult = { success: false, error: `Unknown platform: ${platform}` };
    }

    if (uploadResult.success) {
      await queueManager.updateEntry(id, { status: 'uploaded' });
      await queueManager.incrementDailyCounter(platform, channelId);
      await logger.info('schedule', `Video ${id} uploaded to ${platform}`);
      return { id, platform, status: 'uploaded' };
    } else {
      await queueManager.updateEntry(id, { 
        status: 'failed', 
        errorMessage: uploadResult.error,
        retryCount: video.retryCount + 1
      });
      await logger.error('schedule', `Video ${id} upload failed`, { error: uploadResult.error });
      return { id, platform, status: 'failed', error: uploadResult.error };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await queueManager.updateEntry(id, { 
      status: 'failed', 
      errorMessage,
      retryCount: video.retryCount + 1
    });
    await logger.error('schedule', `Video ${id} processing error`, { error: errorMessage });
    return { id, platform, status: 'failed', error: errorMessage };
  }
}
