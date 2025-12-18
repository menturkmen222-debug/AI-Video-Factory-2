export interface PlatformConfig {
  id: string;
  name: string;
  displayName: string;
  enabled: boolean;
  maxTitleLength: number;
  maxDescriptionLength: number;
  maxHashtags: number;
  maxHashtagLength: number;
  supportedAspectRatios: string[];
  defaultAspectRatio: string;
  maxDurationSeconds: number;
  minDurationSeconds: number;
  maxFileSizeMB: number;
  supportsScheduling: boolean;
  requiresAuth: boolean;
  authType: 'oauth2' | 'api_key' | 'token' | 'none';
  apiBaseUrl: string;
  optimalPostingHours: number[];
}

export const PLATFORM_REGISTRY: Record<string, PlatformConfig> = {
  youtube: {
    id: 'youtube',
    name: 'youtube',
    displayName: 'YouTube',
    enabled: true,
    maxTitleLength: 100,
    maxDescriptionLength: 5000,
    maxHashtags: 500,
    maxHashtagLength: 100,
    supportedAspectRatios: ['16:9', '9:16', '1:1', '4:3'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 43200,
    minDurationSeconds: 3,
    maxFileSizeMB: 256000,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://www.googleapis.com/youtube/v3',
    optimalPostingHours: [9, 12, 15, 18, 21]
  },
  tiktok: {
    id: 'tiktok',
    name: 'tiktok',
    displayName: 'TikTok',
    enabled: true,
    maxTitleLength: 150,
    maxDescriptionLength: 2200,
    maxHashtags: 100,
    maxHashtagLength: 100,
    supportedAspectRatios: ['9:16', '1:1'],
    defaultAspectRatio: '9:16',
    maxDurationSeconds: 600,
    minDurationSeconds: 3,
    maxFileSizeMB: 287,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://open.tiktokapis.com/v2',
    optimalPostingHours: [7, 10, 12, 15, 19, 21]
  },
  instagram: {
    id: 'instagram',
    name: 'instagram',
    displayName: 'Instagram',
    enabled: true,
    maxTitleLength: 0,
    maxDescriptionLength: 2200,
    maxHashtags: 30,
    maxHashtagLength: 100,
    supportedAspectRatios: ['9:16', '1:1', '4:5'],
    defaultAspectRatio: '9:16',
    maxDurationSeconds: 90,
    minDurationSeconds: 3,
    maxFileSizeMB: 650,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://graph.instagram.com',
    optimalPostingHours: [6, 9, 12, 15, 18, 21]
  },
  facebook: {
    id: 'facebook',
    name: 'facebook',
    displayName: 'Facebook',
    enabled: true,
    maxTitleLength: 255,
    maxDescriptionLength: 63206,
    maxHashtags: 30,
    maxHashtagLength: 100,
    supportedAspectRatios: ['16:9', '9:16', '1:1', '4:5', '2:3'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 14400,
    minDurationSeconds: 1,
    maxFileSizeMB: 10000,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://graph.facebook.com/v18.0',
    optimalPostingHours: [9, 13, 16, 19]
  },
  snapchat: {
    id: 'snapchat',
    name: 'snapchat',
    displayName: 'Snapchat',
    enabled: true,
    maxTitleLength: 100,
    maxDescriptionLength: 160,
    maxHashtags: 10,
    maxHashtagLength: 50,
    supportedAspectRatios: ['9:16'],
    defaultAspectRatio: '9:16',
    maxDurationSeconds: 60,
    minDurationSeconds: 3,
    maxFileSizeMB: 32,
    supportsScheduling: false,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://adsapi.snapchat.com/v1',
    optimalPostingHours: [10, 13, 20, 22]
  },
  pinterest: {
    id: 'pinterest',
    name: 'pinterest',
    displayName: 'Pinterest',
    enabled: true,
    maxTitleLength: 100,
    maxDescriptionLength: 500,
    maxHashtags: 20,
    maxHashtagLength: 50,
    supportedAspectRatios: ['2:3', '9:16', '1:1'],
    defaultAspectRatio: '2:3',
    maxDurationSeconds: 900,
    minDurationSeconds: 4,
    maxFileSizeMB: 2048,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://api.pinterest.com/v5',
    optimalPostingHours: [14, 20, 21]
  },
  x: {
    id: 'x',
    name: 'x',
    displayName: 'X (Twitter)',
    enabled: true,
    maxTitleLength: 0,
    maxDescriptionLength: 280,
    maxHashtags: 10,
    maxHashtagLength: 50,
    supportedAspectRatios: ['16:9', '1:1'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 140,
    minDurationSeconds: 0.5,
    maxFileSizeMB: 512,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://api.twitter.com/2',
    optimalPostingHours: [8, 12, 17, 18]
  },
  reddit: {
    id: 'reddit',
    name: 'reddit',
    displayName: 'Reddit',
    enabled: true,
    maxTitleLength: 300,
    maxDescriptionLength: 40000,
    maxHashtags: 0,
    maxHashtagLength: 0,
    supportedAspectRatios: ['16:9', '1:1', '4:3'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 900,
    minDurationSeconds: 1,
    maxFileSizeMB: 1000,
    supportsScheduling: false,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://oauth.reddit.com',
    optimalPostingHours: [6, 7, 8, 12, 13]
  },
  linkedin: {
    id: 'linkedin',
    name: 'linkedin',
    displayName: 'LinkedIn',
    enabled: true,
    maxTitleLength: 200,
    maxDescriptionLength: 3000,
    maxHashtags: 5,
    maxHashtagLength: 50,
    supportedAspectRatios: ['16:9', '1:1', '9:16'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 600,
    minDurationSeconds: 3,
    maxFileSizeMB: 5000,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://api.linkedin.com/v2',
    optimalPostingHours: [7, 8, 10, 12, 17]
  },
  twitch: {
    id: 'twitch',
    name: 'twitch',
    displayName: 'Twitch Clips',
    enabled: true,
    maxTitleLength: 140,
    maxDescriptionLength: 500,
    maxHashtags: 10,
    maxHashtagLength: 50,
    supportedAspectRatios: ['16:9'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 60,
    minDurationSeconds: 5,
    maxFileSizeMB: 100,
    supportsScheduling: false,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://api.twitch.tv/helix',
    optimalPostingHours: [14, 18, 20, 22]
  },
  kwai: {
    id: 'kwai',
    name: 'kwai',
    displayName: 'Kwai',
    enabled: true,
    maxTitleLength: 150,
    maxDescriptionLength: 1000,
    maxHashtags: 20,
    maxHashtagLength: 50,
    supportedAspectRatios: ['9:16', '1:1'],
    defaultAspectRatio: '9:16',
    maxDurationSeconds: 300,
    minDurationSeconds: 1,
    maxFileSizeMB: 1000,
    supportsScheduling: false,
    requiresAuth: true,
    authType: 'api_key',
    apiBaseUrl: 'https://open.kuaishou.com',
    optimalPostingHours: [12, 18, 20, 21]
  },
  likee: {
    id: 'likee',
    name: 'likee',
    displayName: 'Likee',
    enabled: true,
    maxTitleLength: 150,
    maxDescriptionLength: 1000,
    maxHashtags: 20,
    maxHashtagLength: 50,
    supportedAspectRatios: ['9:16', '1:1'],
    defaultAspectRatio: '9:16',
    maxDurationSeconds: 180,
    minDurationSeconds: 1,
    maxFileSizeMB: 500,
    supportsScheduling: false,
    requiresAuth: true,
    authType: 'api_key',
    apiBaseUrl: 'https://likee.video/api',
    optimalPostingHours: [12, 18, 20, 22]
  },
  dzen: {
    id: 'dzen',
    name: 'dzen',
    displayName: 'Dzen',
    enabled: true,
    maxTitleLength: 200,
    maxDescriptionLength: 5000,
    maxHashtags: 10,
    maxHashtagLength: 50,
    supportedAspectRatios: ['16:9', '9:16', '1:1'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 3600,
    minDurationSeconds: 3,
    maxFileSizeMB: 10000,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://dzen.ru/api',
    optimalPostingHours: [10, 14, 18, 20]
  },
  rumble: {
    id: 'rumble',
    name: 'rumble',
    displayName: 'Rumble',
    enabled: true,
    maxTitleLength: 150,
    maxDescriptionLength: 5000,
    maxHashtags: 20,
    maxHashtagLength: 50,
    supportedAspectRatios: ['16:9', '9:16', '1:1'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 14400,
    minDurationSeconds: 1,
    maxFileSizeMB: 15000,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'api_key',
    apiBaseUrl: 'https://rumble.com/api',
    optimalPostingHours: [9, 12, 18, 21]
  },
  odysee: {
    id: 'odysee',
    name: 'odysee',
    displayName: 'Odysee',
    enabled: true,
    maxTitleLength: 200,
    maxDescriptionLength: 5000,
    maxHashtags: 20,
    maxHashtagLength: 50,
    supportedAspectRatios: ['16:9', '9:16', '1:1'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 7200,
    minDurationSeconds: 1,
    maxFileSizeMB: 5000,
    supportsScheduling: false,
    requiresAuth: true,
    authType: 'api_key',
    apiBaseUrl: 'https://api.lbry.com',
    optimalPostingHours: [10, 14, 18, 20]
  },
  dailymotion: {
    id: 'dailymotion',
    name: 'dailymotion',
    displayName: 'Dailymotion',
    enabled: true,
    maxTitleLength: 255,
    maxDescriptionLength: 3000,
    maxHashtags: 20,
    maxHashtagLength: 50,
    supportedAspectRatios: ['16:9', '4:3'],
    defaultAspectRatio: '16:9',
    maxDurationSeconds: 3600,
    minDurationSeconds: 1,
    maxFileSizeMB: 4000,
    supportsScheduling: true,
    requiresAuth: true,
    authType: 'oauth2',
    apiBaseUrl: 'https://api.dailymotion.com',
    optimalPostingHours: [10, 14, 17, 20]
  }
};

export type PlatformId = keyof typeof PLATFORM_REGISTRY;

export const PLATFORM_IDS = Object.keys(PLATFORM_REGISTRY) as PlatformId[];

export function getPlatformById(id: string): PlatformConfig | undefined {
  return PLATFORM_REGISTRY[id];
}

export function isValidPlatform(id: string): boolean {
  return id in PLATFORM_REGISTRY;
}

export function getEnabledPlatforms(): PlatformConfig[] {
  return Object.values(PLATFORM_REGISTRY).filter(p => p.enabled);
}

export function getPlatformOptimalHours(platformId: string, languageTimezone?: string): number[] {
  const platform = getPlatformById(platformId);
  if (!platform) return [9, 12, 15, 18, 21];
  return platform.optimalPostingHours;
}

export function truncateForPlatform(
  text: string,
  platformId: string,
  field: 'title' | 'description'
): string {
  const platform = getPlatformById(platformId);
  if (!platform) return text;
  
  const maxLength = field === 'title' ? platform.maxTitleLength : platform.maxDescriptionLength;
  if (maxLength === 0 || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength - 3) + '...';
}

export function formatHashtagsForPlatform(
  hashtags: string[],
  platformId: string
): string[] {
  const platform = getPlatformById(platformId);
  if (!platform) return hashtags;
  
  return hashtags
    .slice(0, platform.maxHashtags)
    .map(tag => {
      const cleanTag = tag.startsWith('#') ? tag : `#${tag}`;
      if (platform.maxHashtagLength > 0 && cleanTag.length > platform.maxHashtagLength) {
        return cleanTag.substring(0, platform.maxHashtagLength);
      }
      return cleanTag;
    });
}
