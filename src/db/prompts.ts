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
      if (data?.prompts && data.prompts.length > 0) {
        return data.prompts;
      }
      // Auto-initialize if empty
      await this.logger.info('prompts', 'No prompts found, auto-initializing');
      return await this.initializeDefaultPrompts();
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
      // TTL 3 kun = 259200 sekundd
      await this.kv.put(PROMPTS_KEY, JSON.stringify(data), { expirationTtl: 259200 });
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

    // TTL bilan saqlash
    await this.kv.put(PROMPTS_KEY, JSON.stringify({ prompts, lastGenerated: new Date().toISOString() }), { expirationTtl: 259200 });
    await this.logger.info('prompts', 'Updated prompt', { id });
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
        JSON.stringify({
          "type": "Absurd Surrealism",
          "title": "Realistic Environment + Illogical Events",
          "description": "100% realistic environment, camera quality, and lighting, but completely illogical and impossible events. Creates visual shock.",
          "essence": "Unexpected visual impact - what the mind doesn't expect",
          "key_elements": {
            "setting": "Ultra-realistic, everyday mundane locations (apartment, office, street)",
            "animals": "Using AI to animate real animals performing impossible acts",
            "logic": "Event breaks laws of physics and reality",
            "camera": "High quality, realistic footage - NO stylization",
            "impact": "Cognitive dissonance between realistic visuals and absurd events"
          },
          "example_scenario": "A sheep stuck in a toilet, rotating like a washing machine. 100% real toilet, real bathroom, but the sheep is infinite spinning.",
          "retention_factor": "Viewer brain catches the contradiction - keeps watching to understand"
        }),
        JSON.stringify({
          "type": "Brain Rot Content",
          "title": "Fast Stimuli + Zero Logic = Viral Hypnosis",
          "description": "Rapid-fire visual stimuli without logical connections. Designed for Gen Alpha/Z attention spans. Pure visual noise creating addiction.",
          "essence": "Hypnosis through visual chaos - doesn't make sense, that's the point",
          "key_elements": {
            "pacing": "5-10 cuts per 3 seconds minimum",
            "transitions": "Chaotic, unexpected, NO smooth transitions",
            "audio": "Loud, overlapping, meme sounds and trend audio",
            "effects": "Heavy color grading, saturation, lens distortion",
            "content": "Completely disconnected scenes strung together",
            "hook": "First 0.5 seconds determines 90% of success"
          },
          "example_scenario": "Cut: Animal face. Cut: Explosion sound. Cut: Spinning text. Cut: Animal making weird face. Cut: Random zoom. Cut: Trending song drops.",
          "retention_factor": "Brain can't predict next frame - forces constant attention to avoid missing something"
        }),
        JSON.stringify({
          "type": "Cursed Video Aesthetic",
          "title": "Low Quality Camera + Unsettling Situation",
          "description": "Poor image quality (CCTV, old phone) creates authenticity. Unexplainable situation triggers 'cursed' feeling: fear + curiosity + laughter.",
          "essence": "Found footage horror mixed with comedy - what IS this?",
          "key_elements": {
            "camera": "Deliberately low quality - CCTV, security cam, 2005 phone quality",
            "resolution": "720p or lower, heavy noise/grain",
            "lighting": "Unnatural, surveillance-like, cold",
            "situation": "Bizarre, unexplainable, slightly disturbing but funny",
            "timestamp": "Add timestamp overlay for authenticity (fake OK)",
            "feeling": "Did I just see something cursed?"
          },
          "example_scenario": "CCTV quality: Bunny just standing in kitchen corner at 3am, not moving, staring at camera for 30 seconds. No explanation.",
          "retention_factor": "Unique feeling - not pure fear, not pure funny, but mysterious mixture keeps people sharing"
        }),
        JSON.stringify({
          "type": "Slapstick AI Comedy",
          "title": "AI-Generated Physical Comedy",
          "description": "Animals performing exaggerated physical comedy: falling, hitting, crashing. AI makes it look real but impossible. NO PAIN shown (cartoonish).",
          "essence": "Physical comedy so extreme and unrealistic it's hilarious",
          "key_elements": {
            "actions": "Extreme falls, collisions, flying, bouncing",
            "physics": "AI-enhanced to be MORE dramatic than reality",
            "impact": "Cartoonish but LOOKING realistic",
            "sound_design": "Perfect comedic timing with sound effects",
            "expression": "Animal expressions enhanced to show 'stunned' reactions",
            "scale": "Overexaggerated but believable visually"
          },
          "example_scenario": "Penguin walks into glass door at high speed, bounces back 20 feet, slides on ice, crashes into wall in slow-motion, shakes head dizzy.",
          "retention_factor": "Slapstick is timeless - works across ALL ages and cultures. Pure physical comedy = universal language"
        }),
        JSON.stringify({
          "type": "Uncanny Valley (G'alati Yaqinlik)",
          "title": "Unsettlingly Human-Like Animal Behavior",
          "description": "Animals behaving TOO humanly creates discomfort + fascination. They do things no animal should do: sit on toilet, use phone, eat with utensils.",
          "essence": "Familiar yet wrong - triggers both laughter and unease",
          "key_elements": {
            "behavior": "Animals doing distinctly human activities",
            "expressions": "AI enhances facial expressions to seem almost conscious",
            "intelligence": "Animal appears to UNDERSTAND what it's doing",
            "setting": "Everyday human situations (bathroom, restaurant, office)",
            "props": "Using human objects naturally (phone, toilet, tools)",
            "feeling": "Is this animal actually intelligent? UNSETTLING."
          },
          "example_scenario": "Sheep sitting on toilet like human, reading newspaper, flushing. Making eye contact with camera like 'don't look at me' expression.",
          "retention_factor": "Psychological - brain is confused, forces attention to resolve the confusion. Shareable because 'did you FEEL that?'"
        })
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
