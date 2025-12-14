import { Logger, LogEntry } from '../utils/logger';
import { QueueManager, Platform } from '../db/queue';
import { LogsManager } from '../db/logs';
import { getNextOptimalSlot } from '../utils/scheduling';

export interface StatsResponse {
  queue: {
    pending: number;
    processing: number;
    uploaded: number;
    failed: number;
    total: number;
  };
  timestamp: string;
}

export async function handleGetLogs(
  logsManager: LogsManager,
  logger: Logger,
  url: URL
): Promise<Response> {
  await logger.info('stats', 'Fetching logs');

  try {
    const limit = parseInt(url.searchParams.get('limit') || '100', 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    
    const { logs, total, hasMore } = await logsManager.getPaginatedLogs(limit, offset);
    
    return new Response(JSON.stringify({
      success: true,
      logs,
      total,
      hasMore,
      limit,
      offset
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('stats', 'Failed to fetch logs', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleClearLogs(
  logsManager: LogsManager,
  logger: Logger
): Promise<Response> {
  await logger.info('stats', 'Clearing logs');

  try {
    await logsManager.clearLogs();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Logs cleared successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('stats', 'Failed to clear logs', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleClearQueue(
  queueManager: QueueManager,
  logger: Logger
): Promise<Response> {
  await logger.info('stats', 'Clearing queue');

  try {
    await queueManager.clearQueue();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Queue cleared successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('stats', 'Failed to clear queue', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleGetStats(
  queueManager: QueueManager,
  logger: Logger
): Promise<Response> {
  await logger.info('stats', 'Fetching stats');

  try {
    const rawStats = await queueManager.getStats();
    const videos = await queueManager.getAllVideos();
    const extendedStats = await queueManager.getExtendedStats();
    const dailyUploadCounts = await queueManager.getDailyUploadCounts();
    
    const stats = {
      pending: rawStats.pending,
      processing: rawStats.processing,
      completed: rawStats.uploaded,
      failed: rawStats.failed,
      skipped: rawStats.skipped,
      total: rawStats.pending + rawStats.processing + rawStats.uploaded + rawStats.failed
    };

    const nextScheduledUpload = getNextOptimalSlot('channel1', stats.completed);

    return new Response(JSON.stringify({
      success: true,
      stats,
      queue: stats,
      videos,
      breakdown: {
        byPlatform: extendedStats.byPlatform,
        byChannel: extendedStats.byChannel,
        byPlatformChannel: extendedStats.byPlatformChannel
      },
      dailyUploadCounts,
      nextScheduledUpload: nextScheduledUpload.toISOString(),
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('stats', 'Failed to fetch stats', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
