import { Logger } from '../utils/logger';
import { VideoPrompt } from '../db/prompts';
import { GroqService, GroqConfig } from './groq';

export interface ValidationResult {
  isValid: boolean;
  status: VideoPrompt['validationStatus'];
  message: string;
  suggestion?: string;
  score: number;
}

export interface ImproveResult {
  improvedPrompt: string;
  changes: string[];
  score: number;
}

export class PromptsAIService {
  private config: GroqConfig;
  private logger: Logger;
  private baseUrl = 'https://api.groq.com/openai/v1';
  private model: string | undefined;

  constructor(config: GroqConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  private async ensureModel(): Promise<void> {
    if (this.model) return;
    
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: { 'Authorization': `Bearer ${this.config.apiKey}` }
      });
      if (response.ok) {
        const data = await response.json() as { latestModel?: string };
        this.model = data.latestModel || 'llama-3.1-8b-instant';
      } else {
        this.model = 'llama-3.1-8b-instant';
      }
    } catch {
      this.model = 'llama-3.1-8b-instant';
    }
  }

  private async callGroq(systemPrompt: string, userPrompt: string): Promise<string> {
    await this.ensureModel();

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${errorText}`);
    }

    const result = await response.json() as { choices: Array<{ message: { content: string } }> };
    return result.choices[0]?.message?.content || '';
  }

  async validatePrompt(prompt: VideoPrompt): Promise<ValidationResult> {
    await this.logger.info('promptsAI', 'Validating prompt', { id: prompt.id, channel: prompt.channelId });

    try {
      // If no API key, return basic validation
      if (!this.config.apiKey) {
        await this.logger.warn('promptsAI', 'No API key configured, using offline validation', { id: prompt.id });
        return {
          isValid: true,
          status: 'validated',
          message: 'Prompt is valid (offline validation)',
          score: 85,
          suggestion: undefined
        };
      }

      const systemPrompt = `You are a video content expert. Analyze the given video prompt and validate it.
Return ONLY valid JSON with this exact format:
{
  "isValid": true/false,
  "score": 1-100,
  "status": "validated" or "needs_improvement" or "error",
  "message": "Brief explanation of validation result",
  "suggestion": "If needs improvement, provide specific suggestions"
}

Validation criteria:
1. Topic relevance: Does the prompt match the channel's topic?
2. Clarity: Is the prompt clear and actionable?
3. Creativity: Is the prompt engaging and unique?
4. Completeness: Does it have enough detail for video creation?
5. Viral potential: Will this content perform well on social media?`;

      const userPrompt = `Validate this video prompt for channel "${prompt.channelName}" with topic "${prompt.channelTopic}":

Prompt: "${prompt.promptText}"`;

      const content = await this.callGroq(systemPrompt, userPrompt);
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        return {
          isValid: false,
          status: 'error',
          message: 'Failed to parse validation response',
          score: 0
        };
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      await this.logger.info('promptsAI', 'Validation complete', { 
        id: prompt.id, 
        status: parsed.status, 
        score: parsed.score 
      });

      return {
        isValid: parsed.isValid ?? parsed.score >= 70,
        status: parsed.status || (parsed.score >= 70 ? 'validated' : 'needs_improvement'),
        message: parsed.message || 'Validation complete',
        suggestion: parsed.suggestion,
        score: parsed.score || 0
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('promptsAI', 'Validation failed', { id: prompt.id, error: errorMessage });
      
      return {
        isValid: false,
        status: 'error',
        message: `Validation error: ${errorMessage}`,
        score: 0
      };
    }
  }

  async improvePrompt(prompt: VideoPrompt): Promise<ImproveResult> {
    await this.logger.info('promptsAI', 'Improving prompt', { id: prompt.id, channel: prompt.channelId });

    try {
      const systemPrompt = `You are a viral video content expert. Improve the given video prompt to make it more engaging, clear, and likely to perform well.
Return ONLY valid JSON with this exact format:
{
  "improvedPrompt": "The enhanced version of the prompt with more detail and creativity",
  "changes": ["List of specific improvements made"],
  "score": 1-100
}

Improvement guidelines:
1. Make it more specific and actionable
2. Add viral hooks and engagement elements
3. Include visual/audio suggestions
4. Ensure perfect alignment with channel topic
5. Add emotional triggers and storytelling elements
6. Keep the core idea but enhance execution details`;

      const userPrompt = `Improve this video prompt for channel "${prompt.channelName}" with topic "${prompt.channelTopic}":

Original prompt: "${prompt.promptText}"

${prompt.aiSuggestion ? `Previous AI suggestion: "${prompt.aiSuggestion}"` : ''}`;

      const content = await this.callGroq(systemPrompt, userPrompt);
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('Failed to parse improvement response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      await this.logger.info('promptsAI', 'Improvement complete', { 
        id: prompt.id, 
        score: parsed.score,
        changesCount: parsed.changes?.length 
      });

      return {
        improvedPrompt: parsed.improvedPrompt || prompt.promptText,
        changes: parsed.changes || ['General improvements applied'],
        score: parsed.score || 75
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('promptsAI', 'Improvement failed', { id: prompt.id, error: errorMessage });
      
      throw new Error(`Failed to improve prompt: ${errorMessage}`);
    }
  }

  async validateAllPrompts(prompts: VideoPrompt[]): Promise<Map<string, ValidationResult>> {
    await this.logger.info('promptsAI', 'Batch validating prompts', { count: prompts.length });
    
    const results = new Map<string, ValidationResult>();
    
    for (const prompt of prompts) {
      try {
        const result = await this.validatePrompt(prompt);
        results.set(prompt.id, result);
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        results.set(prompt.id, {
          isValid: false,
          status: 'error',
          message: 'Validation failed',
          score: 0
        });
      }
    }

    await this.logger.info('promptsAI', 'Batch validation complete', { 
      total: prompts.length,
      validated: Array.from(results.values()).filter(r => r.status === 'validated').length
    });

    return results;
  }
}
