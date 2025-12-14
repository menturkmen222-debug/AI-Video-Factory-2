import { Logger } from './utils/logger';
import { QueueManager, Platform } from './db/queue';
import { LogsManager } from './db/logs';
import { NotificationManager } from './db/notifications';
import { SettingsManager } from './db/settings';
import { CloudinaryService, CloudinaryConfig } from './services/cloudinary';
import { GroqService, GroqConfig } from './services/groq';
import { handleUpload } from './routes/upload';
import { handleSchedule, PlatformConfigs } from './routes/schedule';
import { handleGetLogs, handleClearLogs, handleClearQueue, handleGetStats } from './routes/stats';
import { handleFrontend, isFrontendPath } from './routes/frontend';

export interface Env {
  VIDEO_QUEUE: KVNamespace;
  LOGS: KVNamespace;
  
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  
  GROQ_API_KEY: string;
  
  // Global/fallback platform credentials
  YOUTUBE_CLIENT_ID?: string;
  YOUTUBE_CLIENT_SECRET?: string;
  YOUTUBE_REFRESH_TOKEN?: string;
  
  TIKTOK_ACCESS_TOKEN?: string;
  TIKTOK_OPEN_ID?: string;
  
  INSTAGRAM_ACCESS_TOKEN?: string;
  INSTAGRAM_USER_ID?: string;
  
  FACEBOOK_ACCESS_TOKEN?: string;
  FACEBOOK_PAGE_ID?: string;
  
  // Channel-specific credentials (CHANNEL1_, CHANNEL2_, etc.)
  // Format: CHANNEL1_YOUTUBE_CLIENT_ID, CHANNEL1_TIKTOK_ACCESS_TOKEN, etc.
  [key: string]: KVNamespace | string | undefined;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function handleCors(request: Request): Response | null {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }
  return null;
}

function addCorsHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

function getCloudinaryConfig(env: Env): CloudinaryConfig {
  return {
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    apiSecret: env.CLOUDINARY_API_SECRET
  };
}

function getGroqConfig(env: Env): GroqConfig {
  return {
    apiKey: env.GROQ_API_KEY
  };
}

function getPlatformConfigs(env: Env): PlatformConfigs {
  const configs: PlatformConfigs = {};

  if (env.YOUTUBE_CLIENT_ID && env.YOUTUBE_CLIENT_SECRET && env.YOUTUBE_REFRESH_TOKEN) {
    configs.youtube = {
      clientId: env.YOUTUBE_CLIENT_ID,
      clientSecret: env.YOUTUBE_CLIENT_SECRET,
      refreshToken: env.YOUTUBE_REFRESH_TOKEN
    };
  }

  if (env.TIKTOK_ACCESS_TOKEN && env.TIKTOK_OPEN_ID) {
    configs.tiktok = {
      accessToken: env.TIKTOK_ACCESS_TOKEN,
      openId: env.TIKTOK_OPEN_ID
    };
  }

  if (env.INSTAGRAM_ACCESS_TOKEN && env.INSTAGRAM_USER_ID) {
    configs.instagram = {
      accessToken: env.INSTAGRAM_ACCESS_TOKEN,
      igUserId: env.INSTAGRAM_USER_ID
    };
  }

  if (env.FACEBOOK_ACCESS_TOKEN && env.FACEBOOK_PAGE_ID) {
    configs.facebook = {
      accessToken: env.FACEBOOK_ACCESS_TOKEN,
      pageId: env.FACEBOOK_PAGE_ID
    };
  }

  return configs;
}

async function handleGroqHealthCheck(groqService: GroqService, logger: Logger): Promise<Response> {
  await logger.info('health', 'Checking Groq API health');
  
  try {
    const testResult = await groqService.generateMetadata('test', 'test');
    const isHealthy = testResult && testResult.title && testResult.title.length > 0;
    
    return new Response(JSON.stringify({
      success: true,
      status: isHealthy ? 'healthy' : 'degraded',
      service: 'groq',
      lastCheck: new Date().toISOString(),
      details: {
        canGenerateMetadata: isHealthy
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('health', 'Groq health check failed', { error: errorMessage });
    
    return new Response(JSON.stringify({
      success: false,
      status: 'unhealthy',
      service: 'groq',
      lastCheck: new Date().toISOString(),
      error: errorMessage
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleCloudinaryHealthCheck(
  cloudinaryService: CloudinaryService,
  logger: Logger,
  env: Env
): Promise<Response> {
  await logger.info('health', 'Checking Cloudinary health');
  
  try {
    const hasConfig = !!(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
    
    if (!hasConfig) {
      return new Response(JSON.stringify({
        success: false,
        status: 'unconfigured',
        service: 'cloudinary',
        lastCheck: new Date().toISOString(),
        error: 'Cloudinary credentials not configured'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      status: 'healthy',
      service: 'cloudinary',
      lastCheck: new Date().toISOString(),
      details: {
        cloudName: env.CLOUDINARY_CLOUD_NAME,
        configured: true
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('health', 'Cloudinary health check failed', { error: errorMessage });
    
    return new Response(JSON.stringify({
      success: false,
      status: 'unhealthy',
      service: 'cloudinary',
      lastCheck: new Date().toISOString(),
      error: errorMessage
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleGetNotifications(
  notificationManager: NotificationManager,
  logger: Logger
): Promise<Response> {
  await logger.info('notifications', 'Fetching unread notifications');
  
  try {
    const notifications = await notificationManager.getUnreadNotifications();
    
    return new Response(JSON.stringify({
      success: true,
      notifications,
      count: notifications.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('notifications', 'Failed to fetch notifications', { error: errorMessage });
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleMarkNotificationsRead(
  request: Request,
  notificationManager: NotificationManager,
  logger: Logger
): Promise<Response> {
  await logger.info('notifications', 'Marking notifications as read');
  
  try {
    const body = await request.json() as { id?: string; all?: boolean };
    
    if (body.all) {
      const count = await notificationManager.markAllAsRead();
      return new Response(JSON.stringify({
        success: true,
        message: `Marked ${count} notifications as read`
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (body.id) {
      const notification = await notificationManager.markAsRead(body.id);
      if (!notification) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Notification not found'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify({
        success: true,
        notification
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Either id or all must be provided'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('notifications', 'Failed to mark notifications read', { error: errorMessage });
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleGetNotificationCount(
  notificationManager: NotificationManager,
  logger: Logger
): Promise<Response> {
  try {
    const count = await notificationManager.getUnreadCount();
    
    return new Response(JSON.stringify({
      success: true,
      count
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('notifications', 'Failed to get notification count', { error: errorMessage });
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleGetSettings(
  settingsManager: SettingsManager,
  logger: Logger
): Promise<Response> {
  await logger.info('settings', 'Fetching settings');
  
  try {
    const settings = await settingsManager.getSettings();
    const sanitized = settingsManager.sanitizeForResponse(settings);
    
    return new Response(JSON.stringify({
      success: true,
      settings: sanitized
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('settings', 'Failed to fetch settings', { error: errorMessage });
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleUpdateSettings(
  request: Request,
  settingsManager: SettingsManager,
  logger: Logger
): Promise<Response> {
  await logger.info('settings', 'Updating settings');
  
  try {
    const updates = await request.json() as Record<string, unknown>;
    const settings = await settingsManager.updateSettings(updates as any);
    const sanitized = settingsManager.sanitizeForResponse(settings);
    
    return new Response(JSON.stringify({
      success: true,
      settings: sanitized
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('settings', 'Failed to update settings', { error: errorMessage });
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleQueueRetry(
  request: Request,
  path: string,
  queueManager: QueueManager,
  logger: Logger
): Promise<Response> {
  await logger.info('queue', 'Processing retry request', { path });
  
  try {
    const match = path.match(/\/api\/queue\/([^/]+)\/retry/);
    if (!match) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid path'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const videoId = match[1];
    const body = await request.json() as { platform: Platform; channelId: string };
    
    if (!body.platform || !body.channelId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'platform and channelId are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const entry = await queueManager.retryPlatform(videoId, body.platform, body.channelId);
    
    if (!entry) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Video not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      entry
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('queue', 'Failed to process retry', { error: errorMessage });
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const corsResponse = handleCors(request);
    if (corsResponse) return corsResponse;

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const logger = new Logger(env.LOGS);
    const queueManager = new QueueManager(env.VIDEO_QUEUE, logger);
    const logsManager = new LogsManager(env.LOGS);
    const notificationManager = new NotificationManager(env.VIDEO_QUEUE, logger);
    const settingsManager = new SettingsManager(env.VIDEO_QUEUE, logger);
    const cloudinaryService = new CloudinaryService(getCloudinaryConfig(env), logger);
    const groqService = new GroqService(getGroqConfig(env), logger);

    let response: Response;

    try {
      await logger.info('router', `${method} ${path}`);

      switch (true) {
        case path === '/upload-video' && method === 'POST':
          response = await handleUpload(request, queueManager, cloudinaryService, logger);
          break;

        case path === '/run-schedule' && method === 'POST':
          response = await handleSchedule(
            queueManager,
            groqService,
            getPlatformConfigs(env),
            logger,
            env as any
          );
          break;

        case path === '/api/logs' && method === 'GET':
          response = await handleGetLogs(logsManager, logger, url);
          break;

        case path === '/api/clear-logs' && (method === 'POST' || method === 'GET'):
          response = await handleClearLogs(logsManager, logger);
          break;

        case path === '/api/clear-queue' && (method === 'POST' || method === 'GET'):
          response = await handleClearQueue(queueManager, logger);
          break;

        case path === '/api/stats' && method === 'GET':
          response = await handleGetStats(queueManager, logger);
          break;

        case path === '/health' && method === 'GET':
          response = new Response(JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString()
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
          break;

        case path === '/api/health/groq' && method === 'GET':
          response = await handleGroqHealthCheck(groqService, logger);
          break;

        case path === '/api/health/cloudinary' && method === 'GET':
          response = await handleCloudinaryHealthCheck(cloudinaryService, logger, env);
          break;

        case path === '/api/notifications' && method === 'GET':
          response = await handleGetNotifications(notificationManager, logger);
          break;

        case path === '/api/notifications/read' && method === 'POST':
          response = await handleMarkNotificationsRead(request, notificationManager, logger);
          break;

        case path === '/api/notifications/count' && method === 'GET':
          response = await handleGetNotificationCount(notificationManager, logger);
          break;

        case path === '/api/settings' && method === 'GET':
          response = await handleGetSettings(settingsManager, logger);
          break;

        case path === '/api/settings' && method === 'PUT':
          response = await handleUpdateSettings(request, settingsManager, logger);
          break;

        case path.startsWith('/api/queue/') && path.endsWith('/retry') && method === 'POST':
          response = await handleQueueRetry(request, path, queueManager, logger);
          break;

        case isFrontendPath(path) && method === 'GET':
          response = handleFrontend(path);
          break;

        default:
          response = new Response(JSON.stringify({
            error: 'Not Found',
            path,
            method
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await logger.error('router', 'Unhandled error', { error: errorMessage, path, method });
      
      response = new Response(JSON.stringify({
        error: 'Internal Server Error',
        message: errorMessage
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return addCorsHeaders(response);
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    const logger = new Logger(env.LOGS);
    const queueManager = new QueueManager(env.VIDEO_QUEUE, logger);
    const groqService = new GroqService(getGroqConfig(env), logger);

    await logger.info('cron', 'Scheduled job started', { scheduledTime: new Date(event.scheduledTime).toISOString() });

    try {
      await handleSchedule(queueManager, groqService, getPlatformConfigs(env), logger, env as any);
      await logger.info('cron', 'Scheduled job completed');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await logger.error('cron', 'Scheduled job failed', { error: errorMessage });
    }
  }
};
