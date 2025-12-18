import { Logger } from '../utils/logger';
import { GroqService } from './groq';
import { LanguageCode, getLanguageByCode, SUPPORTED_LANGUAGES } from '../config/languages';
import { PlatformId, getPlatformById, truncateForPlatform, formatHashtagsForPlatform } from '../config/platforms';
import { VideoAdaptation, PlatformMetadata } from '../models/videoTemplate';

export interface AdaptationRequest {
  basePrompt: string;
  baseContext?: string;
  targetLanguage: LanguageCode;
  channelId: string;
  channelTopic?: string;
}

export interface AdaptationResult {
  languageCode: LanguageCode;
  title: string;
  description: string;
  hashtags: string[];
  cta: string;
  success: boolean;
  error?: string;
}

export class LanguageAdapterService {
  private groqService: GroqService;
  private logger: Logger;

  constructor(groqService: GroqService, logger: Logger) {
    this.groqService = groqService;
    this.logger = logger;
  }

  async adaptToLanguage(request: AdaptationRequest): Promise<AdaptationResult> {
    const { basePrompt, baseContext, targetLanguage, channelId, channelTopic } = request;
    const langConfig = getLanguageByCode(targetLanguage);

    if (!langConfig) {
      return {
        languageCode: targetLanguage,
        title: '',
        description: '',
        hashtags: [],
        cta: '',
        success: false,
        error: `Unsupported language: ${targetLanguage}`
      };
    }

    await this.logger.info('languageAdapter', `Adapting content to ${langConfig.name}`, {
      languageCode: targetLanguage,
      channelId
    });

    try {
      const systemPrompt = this.buildSystemPrompt(langConfig, channelTopic);
      const userPrompt = this.buildUserPrompt(basePrompt, baseContext, langConfig);

      const response = await this.groqService.generateWithPrompt(systemPrompt, userPrompt);
      const parsed = this.parseResponse(response, targetLanguage);

      await this.logger.info('languageAdapter', `Successfully adapted to ${langConfig.name}`, {
        titleLength: parsed.title.length,
        hashtagCount: parsed.hashtags.length
      });

      return {
        ...parsed,
        success: true
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('languageAdapter', `Failed to adapt to ${langConfig.name}`, {
        error: errorMessage
      });

      return {
        languageCode: targetLanguage,
        title: '',
        description: '',
        hashtags: [],
        cta: '',
        success: false,
        error: errorMessage
      };
    }
  }

  async adaptToMultipleLanguages(
    basePrompt: string,
    baseContext: string | undefined,
    targetLanguages: LanguageCode[],
    channelId: string,
    channelTopic?: string
  ): Promise<AdaptationResult[]> {
    const results: AdaptationResult[] = [];

    for (const lang of targetLanguages) {
      const result = await this.adaptToLanguage({
        basePrompt,
        baseContext,
        targetLanguage: lang,
        channelId,
        channelTopic
      });
      results.push(result);
    }

    return results;
  }

  adaptForPlatform(
    adaptation: VideoAdaptation,
    platformId: PlatformId
  ): PlatformMetadata {
    const platform = getPlatformById(platformId);
    if (!platform) {
      return {
        title: adaptation.title,
        description: adaptation.description,
        hashtags: adaptation.hashtags,
        cta: adaptation.cta
      };
    }

    const title = truncateForPlatform(adaptation.title, platformId, 'title');
    const hashtags = formatHashtagsForPlatform(adaptation.hashtags, platformId);
    
    let description = adaptation.description;
    if (adaptation.cta) {
      description = `${description}\n\n${adaptation.cta}`;
    }
    if (hashtags.length > 0) {
      description = `${description}\n\n${hashtags.join(' ')}`;
    }
    description = truncateForPlatform(description, platformId, 'description');

    return {
      title: platform.maxTitleLength === 0 ? '' : title,
      description,
      hashtags,
      cta: adaptation.cta,
      aspectRatio: platform.defaultAspectRatio
    };
  }

  private buildSystemPrompt(langConfig: any, channelTopic?: string): string {
    const topicContext = channelTopic 
      ? `The content is for a channel focused on: ${channelTopic}.`
      : '';

    return `You are a professional social media content adapter. 
Your task is to create engaging video metadata in ${langConfig.name} (${langConfig.nativeName}).
${topicContext}

CRITICAL RULES:
1. ALL output MUST be in ${langConfig.name} ONLY - NO mixed languages
2. Use natural, native ${langConfig.name} expressions
3. Consider cultural context for ${langConfig.region} region
4. Make content engaging and suitable for social media
5. Hashtags should be relevant and trending in the ${langConfig.name}-speaking community

OUTPUT FORMAT (JSON):
{
  "title": "Engaging title in ${langConfig.name}",
  "description": "Detailed description in ${langConfig.name}",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"],
  "cta": "Call to action in ${langConfig.name}"
}`;
  }

  private buildUserPrompt(basePrompt: string, baseContext: string | undefined, langConfig: any): string {
    return `Create video metadata based on this content:

PROMPT/TOPIC: ${basePrompt}
${baseContext ? `ADDITIONAL CONTEXT: ${baseContext}` : ''}

Generate:
1. An engaging TITLE (max 100 chars) - must be in ${langConfig.name}
2. A compelling DESCRIPTION (150-300 words) - must be in ${langConfig.name}
3. 5-10 relevant HASHTAGS - must be in ${langConfig.name} or commonly used in ${langConfig.region}
4. A strong CALL TO ACTION - must be in ${langConfig.name}

Remember: ALL content must be in ${langConfig.name} ONLY. No English or other languages.`;
  }

  private parseResponse(response: string, languageCode: LanguageCode): Omit<AdaptationResult, 'success' | 'error'> {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      return {
        languageCode,
        title: parsed.title || '',
        description: parsed.description || '',
        hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : [],
        cta: parsed.cta || ''
      };
    } catch (error) {
      return {
        languageCode,
        title: response.substring(0, 100),
        description: response,
        hashtags: [],
        cta: ''
      };
    }
  }
}
