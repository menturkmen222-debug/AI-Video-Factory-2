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
    platforms: Platform[];
    status: 'uploaded' | 'failed' | 'skipped' | 'partial';
    errors?: Record<Platform, string>;
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
        } else if (detail.status === 'partial') {
          // Qisman muvaffaqiyat — statistikaga qo'shish
          result.uploaded++; // yoki alohida hisoblash mumkin
        }
      } else {
        result.failed++;
        result.details.push({
          id: 'unknown',
          platforms: ['youtube'],
          status: 'failed',
          errors: { youtube: res.reason?.message || 'Unknown error' }
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
): Promise<{ id: string; platforms: Platform[]; status: 'uploaded' | 'failed' | 'skipped' | 'partial'; errors?: Record<Platform, string> }> {
  const { id, platforms, channelId, cloudinaryUrl } = video;

  await logger.info('schedule', `Processing video ${id} for platforms: ${platforms.join(', ')}`);

  try {
    // Kunlik limit tekshiruvi — agar barcha platformalar uchun limit oshib ketgan bo'lsa
    let allSkipped = true;
    for (const platform of platforms) {
      const canUpload = await queueManager.canUpload(platform, channelId);
      if (canUpload) {
        allSkipped = false;
        break;
      }
    }

    if (allSkipped) {
      await logger.warn('schedule', `All platforms skipped due to daily limit for ${channelId}`);
      return { id, platforms, status: 'skipped' };
    }

    await queueManager.updateEntry(id, { status: 'processing' });

    // AI metadata — faqat bir marta
    let metadata = video.metadata;
    if (!metadata || !metadata.title) {
      await logger.info('schedule', 'Generating AI metadata', { id });
      metadata = await groqService.generateMetadata();
      await queueManager.updateEntry(id, { metadata });
    }

    const errors: Record<Platform, string> = {} as any;
    let successCount = 0;

    // Har bir platforma uchun yuklash
    for (const platform of platforms) {
      const canUpload = await queueManager.canUpload(platform, channelId);
      if (!canUpload) {
        errors[platform] = 'Daily limit reached';
        continue;
      }

      let uploadResult: { success: boolean; error?: string };

      try {
        switch (platform) {
          case 'youtube':
            if (platformConfigs.youtube) {
              const uploader = new YouTubeUploader(platformConfigs.youtube, logger);
              uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
            } else {
              uploadResult = { success: false, error: 'YouTube not configured' };
            }
            break;

          case 'tiktok':
            if (platformConfigs.tiktok) {
              const uploader = new TikTokUploader(platformConfigs.tiktok, logger);
              uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
            } else {
              uploadResult = { success: false, error: 'TikTok not configured' };
            }
            break;

          case 'instagram':
            if (platformConfigs.instagram) {
              const uploader = new InstagramUploader(platformConfigs.instagram, logger);
              uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
            } else {
              uploadResult = { success: false, error: 'Instagram not configured' };
            }
            break;

          case 'facebook':
            if (platformConfigs.facebook) {
              const uploader = new FacebookUploader(platformConfigs.facebook, logger);
              uploadResult = await uploader.upload(cloudinaryUrl, metadata, channelId);
            } else {
              uploadResult = { success: false, error: 'Facebook not configured' };
            }
            break;

          default:
            uploadResult = { success: false, error: `Unsupported platform: ${platform}` };
        }

        if (uploadResult.success) {
          await queueManager.incrementDailyCounter(platform, channelId);
          successCount++;
        } else {
          errors[platform] = uploadResult.error || 'Unknown upload error';
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unexpected error';
        errors[platform] = msg;
      }
    }

    // Yakuniy holatni aniqlash
    let finalStatus: 'uploaded' | 'failed' | 'partial' = 'uploaded';
    if (successCount === 0) {
      finalStatus = 'failed';
    } else if (successCount < platforms.length) {
      finalStatus = 'partial';
    }

    await queueManager.updateEntry(id, { status: finalStatus });

    const result: any = { id, platforms, status: finalStatus };
    if (Object.keys(errors).length > 0) {
      result.errors = errors;
    }

    await logger.info('schedule', `Video ${id} processing completed with status: ${finalStatus}`);
    return result;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await queueManager.updateEntry(id, { 
      status: 'failed', 
      errorMessage,
      retryCount: (video.retryCount || 0) + 1
    });
    await logger.error('schedule', `Video ${id} processing error`, { error: errorMessage });
    return { id, platforms, status: 'failed', errors: { default: errorMessage } };
  }
}
