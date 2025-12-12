import { Logger } from '../utils/logger';
import { VideoMetadata } from '../db/queue';

export interface GroqConfig {
  apiKey: string;
  model?: string;
}

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const FALLBACK_METADATA: VideoMetadata = {
  title: 'Amazing Video Content',
  description: 'Check out this incredible video! Like, comment and subscribe for more amazing content.',
  tags: ['video', 'content', 'viral', 'trending', 'amazing', 'mustwatch']
};

export class GroqService {
  private config: GroqConfig;
  private logger: Logger;
  private baseUrl = 'https://api.groq.com/openai/v1';

  constructor(config: GroqConfig, logger: Logger) {
    this.config = {
      ...config,
      model: config.model || 'llama-3.1-70b-versatile'
    };
    this.logger = logger;
  }

  async generateMetadata(videoContext?: string): Promise<VideoMetadata> {
    await this.logger.info('groq', 'Generating AI metadata', { context: videoContext });

    try {
      const systemPrompt = `You are a social media expert. Generate engaging video metadata.
Return ONLY valid JSON with this exact format:
{
  "title": "max 55 characters, catchy and engaging",
  "description": "max 180 characters, compelling description with call to action",
  "tags": ["5 to 10 relevant hashtags without # symbol"]
}`;

      const userPrompt = videoContext 
        ? `Generate metadata for this video: ${videoContext}`
        : 'Generate generic engaging video metadata for a viral social media video.';

      const messages: GroqMessage[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ];

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.config.model,
          messages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        await this.logger.error('groq', 'API request failed', { status: response.status, error: errorText });
        return this.getFallbackMetadata();
      }

      const result = await response.json() as GroqResponse;
      const content = result.choices[0]?.message?.content;

      if (!content) {
        await this.logger.warn('groq', 'Empty response from API');
        return this.getFallbackMetadata();
      }

      const metadata = this.parseMetadata(content);
      await this.logger.info('groq', 'Metadata generated successfully', { metadata });
      
      return metadata;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('groq', 'Metadata generation exception', { error: errorMessage });
      return this.getFallbackMetadata();
    }
  }

  private parseMetadata(content: string): VideoMetadata {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return this.getFallbackMetadata();
      }

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
    this.logger.warn('groq', 'Using fallback metadata');
    return { ...FALLBACK_METADATA };
  }
}
