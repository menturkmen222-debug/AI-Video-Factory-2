import { Logger } from '../utils/logger';
import { CHANNEL_NAMES, VIDEOS_PER_DAY_PER_CHANNEL } from '../config/channels';

export interface VideoPrompt {
  id: string;
  channelId: string;
  channelName: string;
  channelTopic: string;
  promptText: string;
  validationStatus: 'pending' | 'validated' | 'needs_improvement' | 'error';
  validationMessage?: string;
  aiSuggestion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromptsData {
  prompts: VideoPrompt[];
  lastGenerated: string;
}

const PROMPTS_KEY = 'prompts:all';

export class PromptsManager {
  private kv: KVNamespace;
  private logger: Logger;

  constructor(kv: KVNamespace, logger: Logger) {
    this.kv = kv;
    this.logger = logger;
  }

  async getAllPrompts(): Promise<VideoPrompt[]> {
    try {
      const data = await this.kv.get<PromptsData>(PROMPTS_KEY, 'json');
      return data?.prompts || [];
    } catch (error) {
      await this.logger.error('prompts', 'Failed to get prompts', { error });
      return [];
    }
  }

  async getPromptsByChannel(channelId: string): Promise<VideoPrompt[]> {
    const prompts = await this.getAllPrompts();
    return prompts.filter(p => p.channelId === channelId);
  }

  async getPromptById(id: string): Promise<VideoPrompt | null> {
    const prompts = await this.getAllPrompts();
    return prompts.find(p => p.id === id) || null;
  }

  async saveAllPrompts(prompts: VideoPrompt[]): Promise<void> {
    try {
      const data: PromptsData = {
        prompts,
        lastGenerated: new Date().toISOString()
      };
      await this.kv.put(PROMPTS_KEY, JSON.stringify(data));
      await this.logger.info('prompts', 'Saved all prompts', { count: prompts.length });
    } catch (error) {
      await this.logger.error('prompts', 'Failed to save prompts', { error });
      throw error;
    }
  }

  async updatePrompt(id: string, updates: Partial<VideoPrompt>): Promise<VideoPrompt | null> {
    const prompts = await this.getAllPrompts();
    const index = prompts.findIndex(p => p.id === id);
    
    if (index === -1) {
      await this.logger.warn('prompts', 'Prompt not found', { id });
      return null;
    }

    prompts[index] = {
      ...prompts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.saveAllPrompts(prompts);
    return prompts[index];
  }

  async updatePromptValidation(
    id: string, 
    status: VideoPrompt['validationStatus'], 
    message?: string,
    suggestion?: string
  ): Promise<VideoPrompt | null> {
    return this.updatePrompt(id, {
      validationStatus: status,
      validationMessage: message,
      aiSuggestion: suggestion
    });
  }

  async initializeDefaultPrompts(): Promise<VideoPrompt[]> {
    const existingPrompts = await this.getAllPrompts();
    if (existingPrompts.length >= 25) {
      await this.logger.info('prompts', 'Prompts already initialized', { count: existingPrompts.length });
      return existingPrompts;
    }

    const prompts: VideoPrompt[] = [];
    const now = new Date().toISOString();

    for (const channel of CHANNEL_NAMES) {
      const channelPrompts = this.generateDefaultPromptsForChannel(channel, now);
      prompts.push(...channelPrompts);
    }

    await this.saveAllPrompts(prompts);
    await this.logger.info('prompts', 'Initialized default prompts', { count: prompts.length });
    return prompts;
  }

  private generateDefaultPromptsForChannel(
    channel: typeof CHANNEL_NAMES[number], 
    timestamp: string
  ): VideoPrompt[] {
    const promptTemplates = this.getPromptTemplatesForTopic(channel.topic);
    
    return promptTemplates.map((promptText, index) => ({
      id: `${channel.id}-prompt-${index + 1}`,
      channelId: channel.id,
      channelName: channel.displayName,
      channelTopic: channel.topic,
      promptText,
      validationStatus: 'pending' as const,
      createdAt: timestamp,
      updatedAt: timestamp
    }));
  }

  private getPromptTemplatesForTopic(topic: string): string[] {
    const templates: Record<string, string[]> = {
      'Technology & Innovation': [
        'Create a 60-second explainer video about how AI is revolutionizing smartphone photography, showing before/after examples and explaining the underlying technology in simple terms.',
        'Produce a fast-paced tech news video covering the top 5 breakthrough innovations of this month, with quick transitions, engaging graphics, and predictions for future impact.',
        'Design a comparison video between the latest flagship phones from top brands, highlighting camera quality, performance benchmarks, and value for money with dynamic split-screen visuals.',
        'Develop a tutorial-style video showing 10 hidden productivity features in popular apps that most users don\'t know about, with screen recordings and step-by-step demonstrations.',
        'Create an inspiring documentary-style video about a tech startup that solved a major problem, featuring interview-style narration and dramatic storytelling elements.'
      ],
      'Lifestyle & Health': [
        'Produce a calming morning routine video featuring 5 science-backed habits for energy and focus, with soft lighting, relaxing music, and practical tips viewers can implement immediately.',
        'Create an engaging workout video showcasing a 15-minute full-body exercise routine requiring no equipment, suitable for beginners with clear form demonstrations and motivation.',
        'Design a meal prep video featuring 5 healthy recipes for busy professionals, with close-up cooking shots, nutritional information, and time-saving tips.',
        'Develop a mindfulness and meditation guide video teaching breathing techniques for stress relief, with serene visuals, calming narration, and guided practice sessions.',
        'Produce a lifestyle transformation story video showing realistic daily habits that improved someone\'s health over 30 days, with progress tracking and actionable advice.'
      ],
      'Business & Finance': [
        'Create an educational video explaining investment basics for beginners, covering stocks, bonds, and ETFs with animated graphics, real examples, and risk management tips.',
        'Produce a motivational video featuring 5 habits of highly successful entrepreneurs, with inspiring quotes, case studies, and practical action steps for viewers.',
        'Design a step-by-step guide video on building passive income streams, explaining different methods with realistic expectations, required investments, and success stories.',
        'Develop an analytical video breaking down market trends and their impact on personal finance, with charts, expert insights, and actionable recommendations.',
        'Create a comprehensive video on negotiation tactics for salary increases, featuring role-play scenarios, psychology tips, and real-world success examples.'
      ],
      'Entertainment & Comedy': [
        'Produce a hilarious reaction video to the week\'s most viral social media moments, with witty commentary, perfectly timed edits, and shareable punchlines.',
        'Create a sketch comedy video parodying common workplace situations, featuring relatable scenarios, exaggerated characters, and unexpected plot twists.',
        'Design a challenge video with a unique twist on a trending format, incorporating creative elements, genuine reactions, and audience engagement hooks.',
        'Develop a compilation video of the funniest animal moments with creative sound effects, comedic narration, and perfect comedic timing in editing.',
        'Produce a "day in the life" parody video exaggerating common daily struggles with dramatic effects, over-the-top reactions, and self-deprecating humor.'
      ],
      'Education & Learning': [
        'Create an animated explainer video about a complex scientific concept, breaking it down into digestible segments with colorful visuals and memorable analogies.',
        'Produce a historical documentary-style video covering a lesser-known but fascinating event, with archival imagery, dramatic narration, and modern relevance connections.',
        'Design a language learning video teaching 10 essential phrases with pronunciation guides, cultural context, and memory techniques for quick retention.',
        'Develop a practical skills tutorial video demonstrating a valuable life skill step-by-step, with clear instructions, common mistake warnings, and expert tips.',
        'Create an educational video exploring interesting facts about a topic, presenting information in an engaging quiz format with surprising reveals and deeper explanations.'
      ]
    };

    return templates[topic] || templates['Technology & Innovation'];
  }

  getChannelStats(): { channelId: string; channelName: string; topic: string; promptCount: number }[] {
    return CHANNEL_NAMES.map(channel => ({
      channelId: channel.id,
      channelName: channel.displayName,
      topic: channel.topic,
      promptCount: VIDEOS_PER_DAY_PER_CHANNEL
    }));
  }
}
