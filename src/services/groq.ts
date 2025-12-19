import { Logger } from '../utils/logger';
import { VideoMetadata } from '../db/queue';

export interface GroqConfig {
  apiKey: string;
  model?: string;
  maxRetries?: number;
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

// Mavjud modellardan eng yaxshisini tanlash uchun prioritet ro'yxati (2025 dekabr holati bo'yicha aktual)
const PREFERRED_MODELS = [
  'llama-3.3-70b-versatile',                   // Eng yaxshi barqaror model
  'openai/gpt-oss-120b',                       // Flagship kuchli model
  'meta-llama/llama-4-scout-17b-16e-instruct', // Yangi preview model (eski nomi to'g'rilandi)
  'llama-3.1-8b-instant'                       // Tez va doimiy fallback
];

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
    this.config = { maxRetries: 2, ...config };
    this.logger = logger;
  }

  // Yangi: Avtomatik eng yaxshi mavjud modelni tanlaydi
  private async setLatestModel(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: { 'Authorization': `Bearer ${this.config.apiKey}` }
      });

      if (!response.ok) throw new Error(`Failed to fetch models: ${response.status}`);

      const data = await response.json() as { data: Array<{ id: string }> };

      // Mavjud modellardan prioritet bo'yicha birinchisini tanlaymiz
      const availableModels = data.data.map(m => m.id);
      const selectedModel = PREFERRED_MODELS.find(model => availableModels.includes(model));

      if (selectedModel) {
        this.config.model = selectedModel;
        await this.logger.info('groq', 'Best available model selected automatically', { model: selectedModel });
      } else {
        // Agar hech biri topilmasa, birinchi mavjud modelni fallback qilamiz
        this.config.model = availableModels[0] || 'llama-3.1-8b-instant';
        await this.logger.warn('groq', 'No preferred model found, using first available as fallback', { model: this.config.model });
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      // API ga ulanolmasa – eng ishonchli fallback
      this.config.model = 'llama-3.1-8b-instant';
      await this.logger.error('groq', 'Failed to fetch models list, using safe fallback', { error: errMsg, model: this.config.model });
    }
  }

  // --- Retry wrapper ---
  private async retry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
    let attempt = 0;
    let lastError: any;
    while (attempt <= retries) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        attempt++;
        await this.logger.warn('groq', `Retry attempt ${attempt}/${retries} due to error`, { error });
      }
    }
    throw lastError;
  }

  async generateMetadata(videoContext?: string, channelName?: string): Promise<VideoMetadata> {
    await this.logger.info('groq', 'Generating AI metadata', { context: videoContext, channel: channelName });

    // Ensure latest model is set
    if (!this.config.model) await this.setLatestModel();

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
        userPrompt = `Generate metadata for this video from channel "${channelName}": ${videoContext}`;
      } else if (videoContext) {
        userPrompt = `Generate metadata for this video: ${videoContext}`;
      } else if (channelName) {
        userPrompt = `Generate engaging video metadata for channel "${channelName}".`;
      } else {
        userPrompt = 'Generate generic engaging video metadata for a viral social media video.';
      }

      const messages: GroqMessage[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ];

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const fetchMetadata = async () => {
        try {
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
            }),
            signal: controller.signal
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: ${response.status} - ${errorText}`);
          }

          const result = await response.json() as GroqResponse;
          const content = result.choices[0]?.message?.content;
          if (!content) throw new Error('Empty response from API');
          return content;
        } finally {
          clearTimeout(timeoutId);
        }
      };

      const content = await this.retry(fetchMetadata, this.config.maxRetries!);
      const metadata = this.parseMetadata(content);

      await this.logger.info('groq', 'Metadata generated successfully via groq', { metadata, provider: 'groq' });
      return metadata;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('groq', 'Metadata generation failed', { error: errorMessage });
      throw error;
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
    this.logger.warn('groq', 'Using fallback metadata');
    return { ...FALLBACK_METADATA };
  }

  async generateWithPrompt(systemPrompt: string, userPrompt: string): Promise<string> {
    await this.logger.info('groq', 'Generating with custom prompt');

    if (!this.config.model) await this.setLatestModel();

    try {
      const messages: GroqMessage[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ];

      const fetchResponse = async () => {
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
            max_tokens: 1500
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API request failed: ${errorText}`);
        }

        const result = await response.json() as GroqResponse;
        const content = result.choices[0]?.message?.content;
        if (!content) throw new Error('Empty response from API');
        return content;
      };

      const content = await this.retry(fetchResponse, this.config.maxRetries!);
      await this.logger.info('groq', 'Generated response successfully');
      return content;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('groq', 'Generation failed', { error: errorMessage });
      throw error;
    }
  }
                         }
