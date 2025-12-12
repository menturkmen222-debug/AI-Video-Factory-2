import { Logger } from './utils/logger';
import { QueueManager } from './db/queue';
import { LogsManager } from './db/logs';
import { CloudinaryService, CloudinaryConfig } from './services/cloudinary';
import { GroqService, GroqConfig } from './services/groq';
import { handleUpload } from './routes/upload';
import { handleSchedule, PlatformConfigs } from './routes/schedule';
import { handleGetLogs, handleClearLogs, handleClearQueue, handleGetStats } from './routes/stats';

export interface Env {
  VIDEO_QUEUE: KVNamespace;
  LOGS: KVNamespace;
  
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  
  GROQ_API_KEY: string;
  
  YOUTUBE_CLIENT_ID?: string;
  YOUTUBE_CLIENT_SECRET?: string;
  YOUTUBE_REFRESH_TOKEN?: string;
  
  TIKTOK_ACCESS_TOKEN?: string;
  TIKTOK_OPEN_ID?: string;
  
  INSTAGRAM_ACCESS_TOKEN?: string;
  INSTAGRAM_USER_ID?: string;
  
  FACEBOOK_ACCESS_TOKEN?: string;
  FACEBOOK_PAGE_ID?: string;
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
            logger
          );
          break;

        case path === '/api/logs' && method === 'GET':
          response = await handleGetLogs(logsManager, logger);
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

        case path === '/' && method === 'GET':
          response = new Response(JSON.stringify({
            name: 'AI Video Uploader',
            version: '1.0.0',
            endpoints: [
              { path: '/upload-video', method: 'POST', description: 'Upload video' },
              { path: '/run-schedule', method: 'POST', description: 'Run scheduler' },
              { path: '/api/logs', method: 'GET', description: 'Get logs' },
              { path: '/api/clear-logs', method: 'POST/GET', description: 'Clear logs' },
              { path: '/api/clear-queue', method: 'POST/GET', description: 'Clear queue' },
              { path: '/api/stats', method: 'GET', description: 'Get queue stats' },
              { path: '/health', method: 'GET', description: 'Health check' }
            ]
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
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
      await handleSchedule(queueManager, groqService, getPlatformConfigs(env), logger);
      await logger.info('cron', 'Scheduled job completed');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await logger.error('cron', 'Scheduled job failed', { error: errorMessage });
    }
  }
};
