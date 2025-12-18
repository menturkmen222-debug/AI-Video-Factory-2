import { Logger } from '../utils/logger';
import { GroqService } from '../services/groq';
import { VideoDistributorService, DistributionConfig, DistributionResult } from '../services/videoDistributor';
import { PlatformId, PLATFORM_IDS, getPlatformById, getEnabledPlatforms } from '../config/platforms';
import { LanguageCode, SUPPORTED_LANGUAGES, getLanguageByCode } from '../config/languages';
import { CHANNEL_NAMES, VIDEOS_PER_DAY_PER_CHANNEL, TOTAL_CHANNELS } from '../config/channels';
import { PlatformCredentials } from '../platforms';

export interface DistributionRequest {
  videoUrl: string;
  prompt: string;
  context?: string;
  channelId: string;
  languages: LanguageCode[];
  platforms: PlatformId[];
}

export async function handleDistributeVideo(
  request: Request,
  groqService: GroqService,
  credentials: Record<PlatformId, PlatformCredentials>,
  logger: Logger
): Promise<Response> {
  try {
    const body = await request.json() as DistributionRequest;

    if (!body.videoUrl || !body.prompt || !body.channelId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: videoUrl, prompt, channelId'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const distributor = new VideoDistributorService(groqService, logger);

    const config: DistributionConfig = {
      channelId: body.channelId,
      languageCodes: body.languages || ['en'],
      platformIds: body.platforms || ['youtube', 'tiktok', 'instagram', 'facebook'],
      credentials
    };

    const result = await distributor.distributeVideo(
      body.videoUrl,
      body.prompt,
      config,
      body.context
    );

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await logger.error('distribution', 'Handle distribute failed', { error: errorMessage });

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleGetPlatforms(logger: Logger): Promise<Response> {
  try {
    const platforms = getEnabledPlatforms().map(p => ({
      id: p.id,
      name: p.displayName,
      maxTitleLength: p.maxTitleLength,
      maxDescriptionLength: p.maxDescriptionLength,
      maxHashtags: p.maxHashtags,
      supportedAspectRatios: p.supportedAspectRatios,
      defaultAspectRatio: p.defaultAspectRatio,
      maxDurationSeconds: p.maxDurationSeconds,
      supportsScheduling: p.supportsScheduling
    }));

    return new Response(JSON.stringify({
      success: true,
      platforms,
      count: platforms.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleGetLanguages(logger: Logger): Promise<Response> {
  try {
    const languages = SUPPORTED_LANGUAGES.map(lang => ({
      code: lang.code,
      name: lang.name,
      nativeName: lang.nativeName,
      region: lang.region,
      timezone: lang.timezone
    }));

    return new Response(JSON.stringify({
      success: true,
      languages,
      count: languages.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleGetChannels(logger: Logger): Promise<Response> {
  try {
    const channels = CHANNEL_NAMES.map(ch => ({
      id: ch.id,
      name: ch.name,
      displayName: ch.displayName,
      topic: ch.topic,
      topicDescription: ch.topicDescription
    }));

    return new Response(JSON.stringify({
      success: true,
      channels,
      count: channels.length,
      videosPerDay: VIDEOS_PER_DAY_PER_CHANNEL,
      totalVideosPerDay: TOTAL_CHANNELS * VIDEOS_PER_DAY_PER_CHANNEL
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function handleValidateStructure(
  groqService: GroqService,
  logger: Logger
): Promise<Response> {
  try {
    const distributor = new VideoDistributorService(groqService, logger);
    const validation = distributor.validateDailyStructure();

    return new Response(JSON.stringify({
      success: true,
      validation: validation.summary
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
