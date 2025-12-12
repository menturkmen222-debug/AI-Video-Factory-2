import { Logger } from '../utils/logger';
import { QueueManager, Platform } from '../db/queue';
import { CloudinaryService } from '../services/cloudinary';

export interface UploadRequest {
  videoUrl?: string;
  platforms: Platform[];
  channelId: string;
  videoContext?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  queueEntries?: Array<{
    id: string;
    platform: Platform;
    status: string;
  }>;
  error?: string;
}

export async function handleUpload(
  request: Request,
  queueManager: QueueManager,
  cloudinaryService: CloudinaryService,
  logger: Logger
): Promise<Response> {
  await logger.info('upload', 'Upload request received');

  try {
    const contentType = request.headers.get('content-type') || '';
    
    let videoUrl: string;
    let platforms: Platform[] = ['youtube', 'tiktok', 'instagram', 'facebook'];
    let channelId: string = 'default';
    let videoContext: string | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('video') as File | null;
      const urlField = formData.get('videoUrl') as string | null;
      const platformsField = formData.get('platforms') as string | null;
      const channelField = formData.get('channelId') as string | null;
      const contextField = formData.get('videoContext') as string | null;

      if (file && file.size > 0) {
        await logger.info('upload', 'Processing file upload', { filename: file.name, size: file.size });
        
        const buffer = await file.arrayBuffer();
        const uploadResult = await cloudinaryService.uploadFromFile(buffer, file.name);
        
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.error || 'Failed to upload to Cloudinary');
        }
        
        videoUrl = uploadResult.url;
      } else if (urlField) {
        await logger.info('upload', 'Processing URL upload', { url: urlField });
        
        const uploadResult = await cloudinaryService.uploadFromUrl(urlField);
        
        if (!uploadResult.success || !uploadResult.url) {
          throw new Error(uploadResult.error || 'Failed to upload to Cloudinary');
        }
        
        videoUrl = uploadResult.url;
      } else {
        throw new Error('No video file or URL provided');
      }

      if (platformsField) {
        platforms = JSON.parse(platformsField) as Platform[];
      }
      if (channelField) {
        channelId = channelField;
      }
      if (contextField) {
        videoContext = contextField;
      }
    } else {
      const body = await request.json() as UploadRequest;
      
      if (!body.videoUrl) {
        throw new Error('No video URL provided');
      }

      await logger.info('upload', 'Processing JSON URL upload', { url: body.videoUrl });
      
      const uploadResult = await cloudinaryService.uploadFromUrl(body.videoUrl);
      
      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(uploadResult.error || 'Failed to upload to Cloudinary');
      }
      
      videoUrl = uploadResult.url;
      platforms = body.platforms || platforms;
      channelId = body.channelId || channelId;
      videoContext = body.videoContext;
    }

    const queueEntries: Array<{ id: string; platform: Platform; status: string }> = [];

    for (const platform of platforms) {
      const entry = await queueManager.addToQueue({
        videoUrl: videoUrl,
        cloudinaryUrl: videoUrl,
        platforms,
        channelId,
        metadata: videoContext ? { title: '', description: '', tags: [] } : undefined
      });

      queueEntries.push({
        id: entry.id,
        platforms: entry.platforms,
        status: entry.status
      });
    }

    await logger.info('upload', 'Upload complete, entries added to queue', { 
      count: queueEntries.length,
      platforms 
    });

    const response: UploadResponse = {
      success: true,
      message: `Video uploaded and ${queueEntries.length} queue entries created`,
      queueEntries
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('upload', 'Upload failed', { error: errorMessage });

    const response: UploadResponse = {
      success: false,
      message: 'Upload failed',
      error: errorMessage
    };

    return new Response(JSON.stringify(response), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
