import { Logger } from '../utils/logger';
import { GroqService } from './groq';
import { OpenRouterService } from './openrouter';
import { VideoMetadata } from '../db/queue';
import { AISettingsManager, AIProvider } from './aiSettings';

const STATIC_FALLBACK_METADATA: VideoMetadata = {
  title: 'Amazing Video Content',
  description: 'Check out this incredible video! Like, comment and subscribe for more amazing content.',
  tags: ['video', 'content', 'viral', 'trending', 'amazing', 'mustwatch']
};

export class AIProviderService {
  private groqService: GroqService;
  private openRouterService: OpenRouterService | null;
  private logger: Logger;
  private aiSettings: AISettingsManager;

  constructor(
    groqService: GroqService,
    openRouterService: OpenRouterService | null,
    aiSettings: AISettingsManager,
    logger: Logger
  ) {
    this.groqService = groqService;
    this.openRouterService = openRouterService;
    this.aiSettings = aiSettings;
    this.logger = logger;
  }

  async generateMetadata(videoContext?: string, channelName?: string): Promise<VideoMetadata> {
    const provider = await this.aiSettings.getActiveProvider();
    await this.logger.info('aiProvider', 'Starting metadata generation', { provider, context: videoContext, channel: channelName });

    // PRIMARY: Groq
    if (provider === 'auto' || provider === 'groq') {
      try {
        const metadata = await this.groqService.generateMetadata(videoContext, channelName);
        await this.logger.info('aiProvider', 'Metadata generated successfully', { provider: 'groq', metadata });
        return metadata;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        await this.logger.warn('aiProvider', 'Groq failed, trying fallback', { error: errorMsg });
        
        // If Groq-only was requested, use static fallback
        if (provider === 'groq') {
          await this.logger.warn('aiProvider', 'Groq-only mode but failed, using static fallback');
          return this.getStaticMetadata();
        }
      }
    }

    // SECONDARY: OpenRouter (if available and auto mode)
    if ((provider === 'auto' || provider === 'openrouter') && this.openRouterService) {
      try {
        const metadata = await this.openRouterService.generateMetadata(videoContext, channelName);
        await this.logger.info('aiProvider', 'Metadata generated successfully', { provider: 'openrouter', metadata });
        return metadata;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        await this.logger.warn('aiProvider', 'OpenRouter failed', { error: errorMsg });
        
        // If OpenRouter-only was requested, use static fallback
        if (provider === 'openrouter') {
          await this.logger.warn('aiProvider', 'OpenRouter-only mode but failed, using static fallback');
          return this.getStaticMetadata();
        }
      }
    }

    // FINAL FALLBACK: Static metadata (guaranteed to never fail)
    await this.logger.warn('aiProvider', 'All AI providers failed, using static fallback');
    return this.getStaticMetadata();
  }

  private getStaticMetadata(): VideoMetadata {
    return { ...STATIC_FALLBACK_METADATA };
  }
}
