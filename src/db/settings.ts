import { Logger } from '../utils/logger';
import { Platform } from './queue';

export interface PlatformCredentials {
  youtube?: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
  tiktok?: {
    accessToken: string;
    openId: string;
  };
  instagram?: {
    accessToken: string;
    igUserId: string;
  };
  facebook?: {
    accessToken: string;
    pageId: string;
  };
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  uploadSuccess: boolean;
  uploadFailure: boolean;
  dailyDigest: boolean;
  email?: string;
}

export interface UploadLimits {
  dailyLimitPerChannel: number;
  dailyLimitPerPlatform: number;
  maxConcurrentUploads: number;
  retryAttempts: number;
}

export interface SchedulingConfig {
  enabled: boolean;
  optimalTimes: { hour: number; minute: number }[];
  timezone: string;
  autoRetry: boolean;
}

export interface AppSettings {
  platformCredentials: PlatformCredentials;
  notificationPreferences: NotificationPreferences;
  uploadLimits: UploadLimits;
  schedulingConfig: SchedulingConfig;
  updatedAt: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  platformCredentials: {},
  notificationPreferences: {
    emailNotifications: false,
    uploadSuccess: true,
    uploadFailure: true,
    dailyDigest: false
  },
  uploadLimits: {
    dailyLimitPerChannel: 50,
    dailyLimitPerPlatform: 100,
    maxConcurrentUploads: 3,
    retryAttempts: 3
  },
  schedulingConfig: {
    enabled: true,
    optimalTimes: [
      { hour: 9, minute: 0 },
      { hour: 12, minute: 0 },
      { hour: 15, minute: 0 },
      { hour: 18, minute: 0 },
      { hour: 21, minute: 0 }
    ],
    timezone: 'America/New_York',
    autoRetry: true
  },
  updatedAt: new Date().toISOString()
};

const SETTINGS_KEY = 'app_settings';

export class SettingsManager {
  private kv: KVNamespace;
  private logger: Logger;

  constructor(kv: KVNamespace, logger: Logger) {
    this.kv = kv;
    this.logger = logger;
  }

  async getSettings(): Promise<AppSettings> {
    try {
      const value = await this.kv.get(SETTINGS_KEY);
      if (!value) {
        await this.logger.info('settings', 'No settings found, returning defaults');
        return { ...DEFAULT_SETTINGS };
      }
      return JSON.parse(value);
    } catch (error) {
      await this.logger.error('settings', 'Failed to get settings', { error });
      return { ...DEFAULT_SETTINGS };
    }
  }

  async updateSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
    const current = await this.getSettings();
    const updated: AppSettings = {
      ...current,
      ...updates,
      platformCredentials: {
        ...current.platformCredentials,
        ...(updates.platformCredentials || {})
      },
      notificationPreferences: {
        ...current.notificationPreferences,
        ...(updates.notificationPreferences || {})
      },
      uploadLimits: {
        ...current.uploadLimits,
        ...(updates.uploadLimits || {})
      },
      schedulingConfig: {
        ...current.schedulingConfig,
        ...(updates.schedulingConfig || {})
      },
      updatedAt: new Date().toISOString()
    };

    await this.kv.put(SETTINGS_KEY, JSON.stringify(updated));
    await this.logger.info('settings', 'Settings updated');

    return updated;
  }

  sanitizeForResponse(settings: AppSettings): Omit<AppSettings, 'platformCredentials'> & { platformCredentials: Record<string, { configured: boolean }> } {
    const sanitized: Record<string, { configured: boolean }> = {};
    
    if (settings.platformCredentials.youtube) {
      sanitized.youtube = { configured: true };
    }
    if (settings.platformCredentials.tiktok) {
      sanitized.tiktok = { configured: true };
    }
    if (settings.platformCredentials.instagram) {
      sanitized.instagram = { configured: true };
    }
    if (settings.platformCredentials.facebook) {
      sanitized.facebook = { configured: true };
    }

    return {
      platformCredentials: sanitized,
      notificationPreferences: settings.notificationPreferences,
      uploadLimits: settings.uploadLimits,
      schedulingConfig: settings.schedulingConfig,
      updatedAt: settings.updatedAt
    };
  }

  async resetToDefaults(): Promise<AppSettings> {
    const defaults = { ...DEFAULT_SETTINGS, updatedAt: new Date().toISOString() };
    await this.kv.put(SETTINGS_KEY, JSON.stringify(defaults));
    await this.logger.info('settings', 'Settings reset to defaults');
    return defaults;
  }
}
