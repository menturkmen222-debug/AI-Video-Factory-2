import { Logger, LogEntry } from '../utils/logger';
import { QueueManager, Platform, GroupedQueueData } from '../db/queue';
import { LogsManager, LogFilters, PaginatedLogsResult } from '../db/logs';

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
  logger: Logger
): Promise<Response> {
  await logger.info('stats', 'Fetching logs');

  try {
    const logs = await logsManager.getRecentLogs(500);
    
    return new Response(JSON.stringify({
      success: true,
      count: logs.length,
      logs
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

export async function handleGetLogsPaginated(
  request: Request,
  logsManager: LogsManager,
  logger: Logger
): Promise<Response> {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor') || null;
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '100', 10), 100);
    const level = url.searchParams.get('level') as LogEntry['level'] | null;
    const source = url.searchParams.get('source');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const search = url.searchParams.get('search');

    const filters: LogFilters = {};
    
    if (level && ['info', 'warn', 'error', 'debug'].includes(level)) {
      filters.level = level;
    }
    
    if (source && ['system', 'platform', 'service'].includes(source)) {
      filters.source = source;
    }
    
    if (startDate) {
      const parsedStart = new Date(startDate);
      if (!isNaN(parsedStart.getTime())) {
        filters.startDate = parsedStart.toISOString();
      }
    }
    
    if (endDate) {
      const parsedEnd = new Date(endDate);
      if (!isNaN(parsedEnd.getTime())) {
        filters.endDate = parsedEnd.toISOString();
      }
    }
    
    if (search && search.trim()) {
      filters.search = search.trim();
    }

    const result = await logsManager.getPaginatedLogs(cursor, limit, filters);
    
    return new Response(JSON.stringify({
      success: true,
      logs: result.logs,
      nextCursor: result.nextCursor,
      hasMore: result.hasMore,
      count: result.totalInBatch
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('stats', 'Failed to fetch paginated logs', { error: errorMessage });

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
    
    const stats = {
      pending: rawStats.pending,
      processing: rawStats.processing,
      completed: rawStats.uploaded,
      failed: rawStats.failed,
      skipped: rawStats.skipped,
      total: rawStats.pending + rawStats.processing + rawStats.uploaded + rawStats.failed
    };

    return new Response(JSON.stringify({
      success: true,
      stats,
      queue: stats,
      videos,
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

export async function handleGetQueueGrouped(
  queueManager: QueueManager,
  logger: Logger
): Promise<Response> {
  await logger.info('stats', 'Fetching grouped queue data');

  try {
    const groupedData = await queueManager.getQueueGroupedByPlatformAndChannel();
    
    return new Response(JSON.stringify({
      success: true,
      data: groupedData,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('stats', 'Failed to fetch grouped queue data', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

const VALID_PLATFORMS: Platform[] = [
  'youtube', 'tiktok', 'instagram', 'facebook', 'snapchat',
  'pinterest', 'x', 'reddit', 'linkedin', 'twitch',
  'kwai', 'likee', 'dzen', 'rumble', 'odysee', 'dailymotion'
];

export async function handleRetryPlatformUpload(
  request: Request,
  queueManager: QueueManager,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as { videoId?: string; platform?: string };
    const { videoId, platform } = body;

    if (!videoId || !platform) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: videoId and platform'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!VALID_PLATFORMS.includes(platform as Platform)) {
      return new Response(JSON.stringify({
        success: false,
        error: `Invalid platform. Must be one of: ${VALID_PLATFORMS.join(', ')}`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await logger.info('stats', 'Retrying platform upload', { videoId, platform });

    const result = await queueManager.retryPlatformUpload(videoId, platform as Platform);

    if (!result) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Video not found or platform not in queue'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Retry scheduled for ${platform} upload`,
      video: result
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('stats', 'Failed to retry platform upload', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
