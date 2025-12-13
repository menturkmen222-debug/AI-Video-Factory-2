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
    platforms: Platform[]; // ✅ platform emas, platforms
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
  await logger.info('upload', 'Step 1: Upload request received - starting processing');

  try {
    const contentType = request.headers.get('content-type') || '';
    await logger.info('upload', 'Step 2: Parsing request data', { contentType: contentType.split(';')[0] });
    
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
        await logger.info('upload', 'Step 3: File detected - preparing upload', { 
          filename: file.name, 
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type 
        });
        
        await logger.info('upload', 'Step 4: Converting file to buffer...');
        const buffer = await file.arrayBuffer();
        
        await logger.info('upload', 'Step 5: Uploading to Cloudinary storage...');
        const uploadResult = await cloudinaryService.uploadFromFile(buffer, file.name);
        
        if (!uploadResult.success || !uploadResult.url) {
          await logger.error('upload', 'Cloudinary upload failed', { error: uploadResult.error });
          throw new Error(uploadResult.error || 'Failed to upload to Cloudinary');
        }
        
        await logger.info('upload', 'Step 6: Cloudinary upload successful', { cloudinaryUrl: uploadResult.url });
        videoUrl = uploadResult.url;
      } else if (urlField) {
        await logger.info('upload', 'Step 3: Video URL provided - fetching from source', { sourceUrl: urlField });
        
        await logger.info('upload', 'Step 4: Transferring video to Cloudinary storage...');
        const uploadResult = await cloudinaryService.uploadFromUrl(urlField);
        
        if (!uploadResult.success || !uploadResult.url) {
          await logger.error('upload', 'Cloudinary transfer failed', { error: uploadResult.error });
          throw new Error(uploadResult.error || 'Failed to upload to Cloudinary');
        }
        
        await logger.info('upload', 'Step 5: Cloudinary transfer successful', { cloudinaryUrl: uploadResult.url });
        videoUrl = uploadResult.url;
      } else {
        await logger.error('upload', 'No video source provided');
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
      
      await logger.info('upload', 'Step 6: Upload parameters configured', { 
        channelId, 
        platforms: platforms.join(', '),
        hasContext: !!videoContext
      });
    } else {
      const body = await request.json() as UploadRequest;
      
      if (!body.videoUrl) {
        await logger.error('upload', 'No video URL in JSON body');
        throw new Error('No video URL provided');
      }

      await logger.info('upload', 'Step 3: JSON request with video URL', { url: body.videoUrl });
      
      await logger.info('upload', 'Step 4: Transferring video to Cloudinary storage...');
      const uploadResult = await cloudinaryService.uploadFromUrl(body.videoUrl);
      
      if (!uploadResult.success || !uploadResult.url) {
        await logger.error('upload', 'Cloudinary transfer failed', { error: uploadResult.error });
        throw new Error(uploadResult.error || 'Failed to upload to Cloudinary');
      }
      
      await logger.info('upload', 'Step 5: Cloudinary transfer successful', { cloudinaryUrl: uploadResult.url });
      videoUrl = uploadResult.url;
      platforms = body.platforms || platforms;
      channelId = body.channelId || channelId;
      videoContext = body.videoContext;
      
      await logger.info('upload', 'Step 6: Upload parameters configured', { 
        channelId, 
        platforms: platforms.join(', '),
        hasContext: !!videoContext
      });
    }

    await logger.info('upload', 'Step 7: Adding video to upload queue...');
    const entry = await queueManager.addToQueue({
      videoUrl: videoUrl,
      cloudinaryUrl: videoUrl,
      platforms,
      channelId,
      videoContext
    });

    await logger.info('upload', 'Step 8: Video successfully queued for processing', { 
      queueId: entry.id,
      channelId,
      platforms: entry.platforms.join(', '),
      status: entry.status
    });

    const response: UploadResponse = {
      success: true,
      message: `Video uploaded and added to queue for ${platforms.length} platforms`,
      queueEntries: [{
        id: entry.id,
        platforms: entry.platforms,
        status: entry.status
      }]
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
