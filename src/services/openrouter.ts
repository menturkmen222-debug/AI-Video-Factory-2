import { Logger } from '../utils/logger';
import { VideoMetadata } from '../db/queue';

export interface OpenRouterConfig {
  apiKey: string;
  maxRetries?: number;
}

const FALLBACK_METADATA: VideoMetadata = {
  title: 'Amazing Video Content',
  description: 'Check out this incredible video! Like, comment and subscribe for more amazing content.',
  tags: ['video', 'content', 'viral', 'trending', 'amazing', 'mustwatch']
};

export class OpenRouterService {
  private config: OpenRouterConfig;
  private logger: Logger;
  private baseUrl = 'https://openrouter.ai/api/v1';

  constructor(config: OpenRouterConfig, logger: Logger) {
    this.config = { maxRetries: 2, ...config };
    this.logger = logger;
  }

  private async retry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
    let attempt = 0;
    let lastError: any;
    while (attempt <= retries) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        attempt++;
        if (attempt <= retries) {
          await this.logger.warn('openrouter', `Retry attempt \( {attempt}/ \){retries}`, { error });
        }
      }
    }
    throw lastError;
  }

  async generateMetadata(videoContext?: string, channelName?: string): Promise<VideoMetadata> {
    await this.logger.info('openrouter', 'Generating AI metadata via OpenRouter');

    try {
      const systemPrompt = `You are a social media expert. Generate engaging video metadata.
Return ONLY valid JSON with this exact format:
{
  "title": "max 55 characters, catchy and engaging",
  "description": "max 180 characters, compelling description with call to action",
  "tags": ["5 to 10 relevant hashtags without # symbol"]
}`;

      let userPrompt: string;
      if (videoContext && channelName) {
        userPrompt = `Generate metadata for this video from channel "\( {channelName}": \){videoContext}`;
      } else if (videoContext) {
        userPrompt = `Generate metadata for this video: ${videoContext}`;
      } else if (channelName) {
        userPrompt = `Generate engaging video metadata for channel "${channelName}".`;
      } else {
        userPrompt = 'Generate generic engaging video metadata for a viral social media video.';
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);  // 10 soniya timeout

      const fetchMetadata = async () => {
        try {
          const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.config.apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://autooz.app',  // O'zgartirmang, yaxshi
              'X-Title': 'AutoOZ'                     // O'zgartirmang
            },
            body: JSON.stringify({
              model: 'openrouter/auto',  // Eng yaxshi: avtomatik tanlaydi (2025 da ishlaydi)
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
              ],
              temperature: 0.7,
              max_tokens: 500
            }),
            signal: controller.signal
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: \( {response.status} - \){errorText}`);
          }

          const result = await response.json() as any;
          const content = result.choices?.[0]?.message?.content;
          if (!content) throw new Error('Empty response from OpenRouter API');
          return content;
        } finally {
          clearTimeout(timeoutId);
        }
      };

      const content = await this.retry(fetchMetadata, this.config.maxRetries!);
      const metadata = this.parseMetadata(content);

      await this.logger.info('openrouter', 'Metadata generated successfully', { metadata });
      return metadata;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('openrouter', 'Metadata generation failed, using fallback', { error: errorMessage });
      return this.getFallbackMetadata();  // Throw emas, fallback qaytar!
    }
  }

  private parseMetadata(content: string): VideoMetadata {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) return this.getFallbackMetadata();

      const parsed = JSON.parse(jsonMatch[0]) as VideoMetadata;
      return {
        title: this.truncateString(parsed.title || FALLBACK_METADATA.title, 55),
        description: this.truncateString(parsed.description || FALLBACK_METADATA.description, 180),
        tags: this.validateTags(parsed.tags)
      };
    } catch {
      return this.getFallbackMetadata();
    }
  }

  private truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
  }

  private validateTags(tags: unknown): string[] {
    if (!Array.isArray(tags)) return FALLBACK_METADATA.tags;

    const validTags = tags
      .filter((tag): tag is string => typeof tag === 'string')
      .map(tag => tag.replace(/^#/, '').trim())
      .filter(tag => tag.length > 0)
      .slice(0, 10);

    if (validTags.length < 5) {
      return [...validTags, ...FALLBACK_METADATA.tags].slice(0, 10);
    }

    return validTags;
  }

  private getFallbackMetadata(): VideoMetadata {
    this.logger.warn('openrouter', 'Using fallback metadata');
    return { ...FALLBACK_METADATA };
  }
}
