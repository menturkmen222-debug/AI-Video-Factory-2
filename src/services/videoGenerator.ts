import { Logger } from '../utils/logger';
import { VideoPrompt } from '../db/prompts';
import { VideoMetadata } from '../db/queue';

export interface VideoSpec {
  title: string;
  description: string;
  tags: string[];
  duration: number;
  visualDescription: string;
  audioDescription: string;
  editingInstructions: string;
  pacing: string;
  hooks: string[];
  trendingFactors: string[];
}

export interface FullVideoPrompt {
  originalPrompt: string;
  videoSpec: VideoSpec;
  generationInstructions: string;
}

export class VideoGeneratorService {
  private logger: Logger;
  private baseUrl = 'https://openrouter.ai/api/v1';
  private apiKey: string;

  constructor(apiKey: string, logger: Logger) {
    this.apiKey = apiKey;
    this.logger = logger;
  }

  async generateCompleteVideoSpec(prompt: VideoPrompt): Promise<FullVideoPrompt> {
    await this.logger.info('videoGenerator', 'Generating complete video spec', {
      promptId: prompt.id,
      channel: prompt.channelName,
      type: this.extractPromptType(prompt.promptText)
    });

    try {
      const systemPrompt = `You are an expert viral video creator. Generate COMPLETE video specifications for a 10-15 second video.
Return ONLY valid JSON with this exact format:
{
  "title": "max 60 characters, highly trending and clickable",
  "description": "150-200 characters, compelling with CTAs and emojis",
  "tags": ["8-12 hashtags without #, trending on current platform"],
  "duration": 12,
  "visualDescription": "Detailed visual composition for the entire 10-15s: camera angles, effects, transitions, colors, lighting, subject positioning",
  "audioDescription": "Complete audio blueprint: background music type/BPM, sound effects timing, voiceover tone if any, audio peaks at key moments",
  "editingInstructions": "Cut frequency: X cuts per second, transition types, color grading style, text overlay placement and timing, speed ramping moments",
  "pacing": "Describe the viewing experience curve: slow start→building tension→climax→resolution. Time each section.",
  "hooks": ["Hook 1 (0-2s): immediate attention grab", "Hook 2 (midpoint): retention moment", "Hook 3 (end): share/follow CTA"],
  "trendingFactors": ["3-5 current trend elements this video leverages"]
}

Content Type: ${this.extractPromptType(prompt.promptText)}
Channel: ${prompt.channelName}
Topic: ${prompt.channelTopic}

CRITICAL REQUIREMENTS:
- Duration MUST be 10-15 seconds
- Every second must serve a purpose
- Include specific timing for each element
- Use 2024-2025 trending sounds/aesthetics
- Optimize for algorithmic retention (hooks at specific timestamps)`;

      const userPrompt = `Create a COMPLETE 10-15 second video specification for:
Channel: "${prompt.channelName}"
Topic: "${prompt.channelTopic}"
Prompt: ${prompt.promptText}

The video MUST:
1. Have a hook in first 2 seconds (stop scroll)
2. Build momentum continuously
3. Have a climax/peak at 8-10 second mark
4. End with a CTA or shareability moment
5. Include specific visual, audio, and editing specs
6. Follow current ${new Date().getFullYear()} viral trends
7. Be optimized for YouTube Shorts, TikTok, and Instagram Reels`;

      const content = await this.callOpenRouter(systemPrompt, userPrompt);
      const spec = this.parseVideoSpec(content);

      const generationInstructions = this.generatePromptForVideoCreator(
        prompt.promptText,
        spec
      );

      await this.logger.info('videoGenerator', 'Video spec generated successfully', {
        promptId: prompt.id,
        duration: spec.duration,
        hooks: spec.hooks.length
      });

      return {
        originalPrompt: prompt.promptText,
        videoSpec: spec,
        generationInstructions
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('videoGenerator', 'Failed to generate video spec', {
        promptId: prompt.id,
        error: errorMessage
      });
      throw new Error(`Failed to generate video spec: ${errorMessage}`);
    }
  }

  private async callOpenRouter(systemPrompt: string, userPrompt: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://autooz.app',
          'X-Title': 'AutoOZ'
        },
        body: JSON.stringify({
          model: 'openrouter/auto',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.8,
          max_tokens: 2000
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json() as any;
      return result.choices?.[0]?.message?.content || '';
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private parseVideoSpec(content: string): VideoSpec {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]) as any;
      return {
        title: parsed.title || 'Trending Video',
        description: parsed.description || 'Check it out!',
        tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 12) : ['viral', 'trending'],
        duration: Math.min(Math.max(parseInt(parsed.duration) || 12, 10), 15),
        visualDescription: parsed.visualDescription || 'Professional video composition',
        audioDescription: parsed.audioDescription || 'Trending background music',
        editingInstructions: parsed.editingInstructions || 'Professional editing',
        pacing: parsed.pacing || 'Engaging pace throughout',
        hooks: Array.isArray(parsed.hooks) ? parsed.hooks : ['Hook in first 2s'],
        trendingFactors: Array.isArray(parsed.trendingFactors) ? parsed.trendingFactors : ['Trending audio']
      };
    } catch (error) {
      return this.getDefaultSpec();
    }
  }

  private getDefaultSpec(): VideoSpec {
    return {
      title: 'Amazing Trending Video',
      description: 'Don\'t miss this viral moment! 🔥 #trending #viral',
      tags: ['viral', 'trending', 'fyp', 'foryoupage', 'explore', 'shorts', 'tiktok'],
      duration: 12,
      visualDescription: 'High-energy visuals with smooth transitions, vibrant colors, and dynamic camera movements throughout the 12-second duration',
      audioDescription: 'Current trending background music with punchy sound effects at key moments and audio peaks at 2s, 7s, and 11s marks',
      editingInstructions: 'Fast-paced editing with 4-5 cuts per second, color grading with warm tones, text overlays with animated entrances, speed ramping at climax',
      pacing: '0-2s: Hook/attention grab | 2-7s: Building momentum | 7-10s: Climax moment | 10-12s: Resolution and CTA',
      hooks: [
        'Hook 1 (0-2s): Unexpected visual or sound',
        'Hook 2 (7s): Peak moment that forces watching',
        'Hook 3 (11s): Share-worthy ending or CTA'
      ],
      trendingFactors: [
        '2024-2025 trending audio track',
        'Algorithmic retention pattern',
        'Platform-specific format optimization'
      ]
    };
  }

  private generatePromptForVideoCreator(originalPrompt: string, spec: VideoSpec): string {
    return `
=== COMPLETE VIDEO GENERATION PROMPT ===

VIDEO SPECIFICATION (10-15 seconds):
Duration: ${spec.duration} seconds exactly

METADATA FOR UPLOAD:
Title: ${spec.title}
Description: ${spec.description}
Tags: ${spec.tags.join(', ')}

VISUAL BLUEPRINT:
${spec.visualDescription}

AUDIO BLUEPRINT:
${spec.audioDescription}

EDITING SPECIFICATIONS:
${spec.editingInstructions}

PACING STRUCTURE:
${spec.pacing}

CRITICAL HOOKS (RETENTION POINTS):
${spec.hooks.map((h, i) => `${i + 1}. ${h}`).join('\n')}

TRENDING ELEMENTS TO INCORPORATE:
${spec.trendingFactors.map((f, i) => `${i + 1}. ${f}`).join('\n')}

ORIGINAL CONCEPT:
${originalPrompt}

GENERATION INSTRUCTIONS:
1. Follow the exact duration: ${spec.duration} seconds
2. Place hooks at the specified timestamps
3. Use the exact visual and audio descriptions
4. Apply all editing specifications
5. Optimize for algorithm retention
6. Include all trending factors
7. Ensure metadata matches the generated spec
`;
  }

  private extractPromptType(promptText: string): string {
    if (typeof promptText === 'string') {
      if (promptText.includes('Absurd Surrealism')) return 'Absurd Surrealism';
      if (promptText.includes('Brain Rot')) return 'Brain Rot Content';
      if (promptText.includes('Cursed')) return 'Cursed Video';
      if (promptText.includes('Slapstick')) return 'Slapstick Comedy';
      if (promptText.includes('Uncanny Valley')) return 'Uncanny Valley';
    }
    return 'General Viral Content';
  }
}
