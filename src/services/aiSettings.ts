import { Logger } from '../utils/logger';

export type AIProvider = 'auto' | 'groq' | 'openrouter';

export interface AISettings {
  provider: AIProvider;
  lastUpdated: string;
}

const SETTINGS_KEY = 'ai:settings';
const DEFAULT_SETTINGS: AISettings = {
  provider: 'auto',
  lastUpdated: new Date().toISOString()
};

export class AISettingsManager {
  private kv: KVNamespace;
  private logger: Logger;

  constructor(kv: KVNamespace, logger: Logger) {
    this.kv = kv;
    this.logger = logger;
  }

  async getSettings(): Promise<AISettings> {
    try {
      const settings = await this.kv.get<AISettings>(SETTINGS_KEY, 'json');
      return settings || DEFAULT_SETTINGS;
    } catch (error) {
      await this.logger.warn('aiSettings', 'Failed to get settings, using defaults', { error });
      return DEFAULT_SETTINGS;
    }
  }

  async setProvider(provider: AIProvider): Promise<AISettings> {
    try {
      const settings: AISettings = {
        provider,
        lastUpdated: new Date().toISOString()
      };
      await this.kv.put(SETTINGS_KEY, JSON.stringify(settings), { expirationTtl: 31536000 });
      await this.logger.info('aiSettings', 'AI provider updated', { provider });
      return settings;
    } catch (error) {
      await this.logger.error('aiSettings', 'Failed to set provider', { error });
      throw error;
    }
  }

  async getActiveProvider(): Promise<AIProvider> {
    const settings = await this.getSettings();
    return settings.provider;
  }
}
