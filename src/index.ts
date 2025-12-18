import { Logger } from './utils/logger';
import { QueueManager } from './db/queue';
import { LogsManager } from './db/logs';
import { PromptsManager } from './db/prompts';
import { CloudinaryService, CloudinaryConfig } from './services/cloudinary';
import { GroqService, GroqConfig } from './services/groq';
import { PromptsAIService } from './services/promptsAI';
import { handleUpload } from './routes/upload';
import { handleSchedule, handleRetryImmediateUpload, PlatformConfigs } from './routes/schedule';
import { handleGetLogs, handleGetLogsPaginated, handleClearLogs, handleClearQueue, handleGetStats, handleGetQueueGrouped, handleRetryPlatformUpload } from './routes/stats';
import { handleFrontend, isFrontendPath } from './routes/frontend';
import { 
  handleGetAllPrompts, 
  handleGetPromptsByChannel, 
  handleValidatePrompt, 
  handleImprovePrompt, 
  handleUpdatePrompt,
  handleValidateAllPrompts,
  handleResetPrompts,
  handleGetPromptsStats
} from './routes/prompts';
import {
  handleDistributeVideo,
  handleGetPlatforms,
  handleGetLanguages,
  handleGetChannels,
  handleValidateStructure
} from './routes/distribution';
import { PlatformCredentials } from './platforms';

export interface Env {
  VIDEO_QUEUE: KVNamespace;
  LOGS: KVNamespace;
  PROMPTS: KVNamespace;
  
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

function getAllPlatformCredentials(env: Env): Record<string, PlatformCredentials> {
  const creds: Record<string, PlatformCredentials> = {};

  if (env.YOUTUBE_CLIENT_ID && env.YOUTUBE_CLIENT_SECRET && env.YOUTUBE_REFRESH_TOKEN) {
    creds.youtube = {
      clientId: env.YOUTUBE_CLIENT_ID,
      clientSecret: env.YOUTUBE_CLIENT_SECRET,
      refreshToken: env.YOUTUBE_REFRESH_TOKEN
    };
  }

  if (env.TIKTOK_ACCESS_TOKEN && env.TIKTOK_OPEN_ID) {
    creds.tiktok = {
      accessToken: env.TIKTOK_ACCESS_TOKEN,
      openId: env.TIKTOK_OPEN_ID
    };
  }

  if (env.INSTAGRAM_ACCESS_TOKEN && env.INSTAGRAM_USER_ID) {
    creds.instagram = {
      accessToken: env.INSTAGRAM_ACCESS_TOKEN,
      userId: env.INSTAGRAM_USER_ID
    };
  }

  if (env.FACEBOOK_ACCESS_TOKEN && env.FACEBOOK_PAGE_ID) {
    creds.facebook = {
      accessToken: env.FACEBOOK_ACCESS_TOKEN,
      pageId: env.FACEBOOK_PAGE_ID
    };
  }

  const platformPrefixes = ['SNAPCHAT', 'PINTEREST', 'X', 'REDDIT', 'LINKEDIN', 'TWITCH', 'KWAI', 'LIKEE', 'DZEN', 'RUMBLE', 'ODYSEE', 'DAILYMOTION'];
  
  for (const prefix of platformPrefixes) {
    const accessToken = env[`${prefix}_ACCESS_TOKEN`] as string | undefined;
    const apiKey = env[`${prefix}_API_KEY`] as string | undefined;
    
    if (accessToken || apiKey) {
      creds[prefix.toLowerCase()] = {
        accessToken,
        apiKey,
        userId: env[`${prefix}_USER_ID`] as string | undefined,
        pageId: env[`${prefix}_PAGE_ID`] as string | undefined,
        clientId: env[`${prefix}_CLIENT_ID`] as string | undefined,
        clientSecret: env[`${prefix}_CLIENT_SECRET`] as string | undefined
      };
    }
  }

  return creds;
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
    const promptsManager = new PromptsManager(env.PROMPTS, logger);
    const cloudinaryService = new CloudinaryService(getCloudinaryConfig(env), logger);
    const groqService = new GroqService(getGroqConfig(env), logger);
    const promptsAI = new PromptsAIService(getGroqConfig(env), logger);

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
          response = await handleGetLogs(logsManager, logger);
          break;

        case path === '/api/logs/paginated' && method === 'GET':
          response = await handleGetLogsPaginated(request, logsManager, logger);
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

        case path === '/api/queue/grouped' && method === 'GET':
          response = await handleGetQueueGrouped(queueManager, logger);
          break;

        case path === '/api/queue/retry' && method === 'POST':
          response = await handleRetryPlatformUpload(request, queueManager, logger);
          break;

        case path === '/api/queue/retry-immediate' && method === 'POST':
          response = await handleRetryImmediateUpload(
            request,
            queueManager,
            groqService,
            getPlatformConfigs(env),
            logger,
            env as any
          );
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

        case path === '/api/prompts' && method === 'GET':
          response = await handleGetAllPrompts(promptsManager, logger);
          break;

        case path === '/api/prompts/channel' && method === 'GET':
          response = await handleGetPromptsByChannel(request, promptsManager, logger);
          break;

        case path === '/api/prompts/stats' && method === 'GET':
          response = await handleGetPromptsStats(promptsManager, logger);
          break;

        case path === '/api/prompts/validate' && method === 'POST':
          response = await handleValidatePrompt(request, promptsManager, promptsAI, logger);
          break;

        case path === '/api/prompts/improve' && method === 'POST':
          response = await handleImprovePrompt(request, promptsManager, promptsAI, logger);
          break;

        case path === '/api/prompts/update' && method === 'POST':
          response = await handleUpdatePrompt(request, promptsManager, logger);
          break;

        case path === '/api/prompts/validate-all' && method === 'POST':
          response = await handleValidateAllPrompts(promptsManager, promptsAI, logger);
          break;

        case path === '/api/prompts/reset' && method === 'POST':
          response = await handleResetPrompts(promptsManager, logger);
          break;

        case path === '/api/distribute' && method === 'POST':
          response = await handleDistributeVideo(
            request,
            groqService,
            getAllPlatformCredentials(env),
            logger
          );
          break;

        case path === '/api/platforms' && method === 'GET':
          response = await handleGetPlatforms(logger);
          break;

        case path === '/api/languages' && method === 'GET':
          response = await handleGetLanguages(logger);
          break;

        case path === '/api/channels' && method === 'GET':
          response = await handleGetChannels(logger);
          break;

        case path === '/api/validate-structure' && method === 'GET':
          response = await handleValidateStructure(groqService, logger);
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
