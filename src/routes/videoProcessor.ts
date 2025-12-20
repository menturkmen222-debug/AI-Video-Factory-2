import { Logger } from '../utils/logger';
import { FFmpegProcessor, ProcessingResult } from '../services/ffmpegProcessor';
import { FileSystemManager } from '../services/fileSystemManager';
import { QueueManagerService, UploadTask } from '../services/queueManager';

export interface ProcessRequest {
  channel: string;
  language: string;
  platform: string;
  videoFile: string;
  logoFile?: string;
  title: string;
  description: string;
  tags: string[];
}

export async function handleProcessVideo(
  request: Request,
  ffmpeg: FFmpegProcessor,
  fileSystem: FileSystemManager,
  queueManager: QueueManagerService,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as ProcessRequest;
    
    const { channel, language, platform, videoFile, logoFile, title, description, tags } = body;

    await logger.info('videoProcessor', 'Processing video request', {
      channel,
      language,
      platform,
      videoFile
    });

    // 1. Get file paths
    const inputPath = fileSystem.getInputPath(videoFile);
    const profileName = fileSystem.generateProfilePath(channel, language, platform);
    const outputPath = profileName.fullPath;

    // 2. Determine logo path
    let logoPath: string | undefined;
    if (logoFile) {
      logoPath = fileSystem.getLogoPath(channel, logoFile);
    }

    // 3. Process video with FFmpeg
    const processResult = await ffmpeg.processVideo({
      inputPath,
      outputPath,
      logoPath,
      logoBranding: logoPath ? {
        position: 'topright',
        scale: 0.15,
        opacity: 0.8
      } : undefined
    });

    if (!processResult.success) {
      throw new Error(processResult.error || 'Video processing failed');
    }

    // 4. Add to queue for upload
    const scheduledTime = new Date().toISOString();
    const uploadTask = await queueManager.addTask(
      channel,
      language,
      platform,
      profileName.filename,
      { title, description, tags },
      scheduledTime
    );

    return new Response(JSON.stringify({
      success: true,
      message: 'Video processed and queued for upload',
      taskId: uploadTask.id,
      processing: {
        inputFile: inputPath,
        outputFile: outputPath,
        duration: processResult.duration,
        fileSize: processResult.fileSize,
        ffmpegCommand: processResult.ffmpegCommand
      },
      queue: {
        taskId: uploadTask.id,
        status: uploadTask.status,
        priority: uploadTask.priority,
        scheduledTime: uploadTask.scheduledTime
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('videoProcessor', 'Video processing failed', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Mock upload endpoint - prints metadata without actual upload
 * Real implementation would call YouTube/TikTok/Instagram APIs
 */
export async function handleMockUpload(
  request: Request,
  queueManager: QueueManagerService,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as { taskId: string };
    const { taskId } = body;

    // Get task from queue
    const allTasks = await queueManager.getAllTasks({ status: 'pending' });
    const task = allTasks.find(t => t.id === taskId);

    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    // Prepare metadata for upload
    const uploadMetadata = {
      title: task.metadata.title,
      description: task.metadata.description,
      tags: task.metadata.tags,
      thumbnail: task.metadata.thumbnail || null,
      platform: task.platform,
      channel: task.channel,
      language: task.language,
      videoFile: task.videoFile,
      uploadTime: new Date().toISOString()
    };

    // Print/log metadata (mock upload)
    console.log('\n========================================');
    console.log('🎬 MOCK UPLOAD - PREPARING TO UPLOAD');
    console.log('========================================');
    console.log(`📺 Platform: ${uploadMetadata.platform.toUpperCase()}`);
    console.log(`🎭 Channel: ${uploadMetadata.channel}`);
    console.log(`🌍 Language: ${uploadMetadata.language}`);
    console.log('----------------------------------------');
    console.log(`📝 Title (${uploadMetadata.title.length}/55):`);
    console.log(`   "${uploadMetadata.title}"`);
    console.log('----------------------------------------');
    console.log(`📄 Description (${uploadMetadata.description.length}/180):`);
    console.log(`   "${uploadMetadata.description}"`);
    console.log('----------------------------------------');
    console.log(`🏷️  Tags (${uploadMetadata.tags.length}):`);
    console.log(`   ${uploadMetadata.tags.join(', ')}`);
    console.log('----------------------------------------');
    console.log(`📹 Video File:`);
    console.log(`   ${uploadMetadata.videoFile}`);
    console.log('----------------------------------------');
    console.log(`⏰ Upload Time: ${uploadMetadata.uploadTime}`);
    console.log('========================================\n');

    // Update task status
    await queueManager.updateTask(taskId, 'completed');

    await logger.info('videoProcessor', 'Mock upload completed (metadata prepared)', {
      taskId,
      platform: task.platform,
      channel: task.channel,
      language: task.language,
      metadataLength: JSON.stringify(uploadMetadata).length
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Mock upload completed - metadata prepared for actual upload',
      taskId,
      metadata: uploadMetadata,
      note: 'Replace this endpoint with actual platform API calls (YouTube Data API, TikTok Open API, etc.)'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('videoProcessor', 'Mock upload failed', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Get queue status endpoint
 */
export async function handleGetQueueStatus(
  queueManager: QueueManagerService,
  logger: Logger
): Promise<Response> {
  try {
    const stats = await queueManager.getQueueStats();
    const tasks = await queueManager.getAllTasks();

    return new Response(JSON.stringify({
      success: true,
      stats,
      recentTasks: tasks.slice(0, 50)
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('videoProcessor', 'Failed to get queue status', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
