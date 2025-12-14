import { Logger, LogEntry } from '../utils/logger';
import { QueueManager } from '../db/queue';
import { LogsManager } from '../db/logs';

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
