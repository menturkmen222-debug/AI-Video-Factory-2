export interface ChannelConfig {
  id: string;
  name: string;
  displayName: string;
  platforms: {
    youtube?: {
      channelId: string;
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
  };
}

export const CHANNEL_NAMES = [
  { id: 'channel1', name: 'rabbit', displayName: 'Qoyin (Rabbit)', topic: 'Fast & Energetic', topicDescription: 'Quick action, bouncy vibes, energetic twists - high energy content!', defaultLanguage: 'en', timezone: 'UTC', dailyLimit: 3 },
  { id: 'channel2', name: 'panda', displayName: 'Panda', topic: 'Cute & Clumsy', topicDescription: 'Adorable moments, clumsy twists, funny falls - heart-melting content', defaultLanguage: 'en', timezone: 'UTC', dailyLimit: 3 },
  { id: 'channel3', name: 'penguin', displayName: 'Pingvin (Penguin)', topic: 'Funny & Slippery', topicDescription: 'Clumsy sliding, cold humor, funny twists - comedy gold!', defaultLanguage: 'en', timezone: 'UTC', dailyLimit: 3 },
  { id: 'channel4', name: 'raccoon', displayName: 'Yenot (Raccoon)', topic: 'Night Life & Mischief', topicDescription: 'Trash diving, night activities, sneaky twists - super viral!', defaultLanguage: 'en', timezone: 'UTC', dailyLimit: 3 },
  { id: 'channel5', name: 'wolf', displayName: 'Bo\'ri (Wolf)', topic: 'Cool & Mysterious', topicDescription: 'Bad boy character, romantic twists, aldov va cool moves - billion views!', defaultLanguage: 'en', timezone: 'UTC', dailyLimit: 3 },
  { id: 'channel6', name: 'hippo', displayName: 'Begemot (Hippo)', topic: 'Heavy & Bold', topicDescription: 'Big personality, heavy twists, impactful moments - powerful content', defaultLanguage: 'ru', timezone: 'Europe/Moscow', dailyLimit: 3 },
  { id: 'channel7', name: 'owl', displayName: 'Boyo\'g\'li (Owl)', topic: 'Wise & Funny', topicDescription: 'Intelligent humor, wise cracks, funny philosophy - clever content', defaultLanguage: 'de', timezone: 'Europe/Berlin', dailyLimit: 3 },
  { id: 'channel8', name: 'crocodile', displayName: 'Timsoh (Crocodile)', topic: 'Scary Yet Cute', topicDescription: 'Big teeth romance, scary but sweet, unique twists - viral moments!', defaultLanguage: 'es', timezone: 'America/Mexico_City', dailyLimit: 3 },
  { id: 'channel9', name: 'koala', displayName: 'Koala', topic: 'Sleepy & Lazy', topicDescription: 'Napping everywhere, sleepy vibes, viral laziness - most relatable!', defaultLanguage: 'en', timezone: 'Australia/Sydney', dailyLimit: 3 },
  { id: 'channel10', name: 'sloth', displayName: 'Lenivets (Sloth)', topic: 'Slowmo & Chill', topicDescription: 'Everything in slow motion, dangasa portlaydi, ultra chill - slowest trends!', defaultLanguage: 'ru', timezone: 'Asia/Tashkent', dailyLimit: 3 }
] as const;

export type ChannelId = typeof CHANNEL_NAMES[number]['id'];

export function getChannelById(id: string): typeof CHANNEL_NAMES[number] | undefined {
  return CHANNEL_NAMES.find(ch => ch.id === id);
}

export function getChannelDailyLimit(channelId: string): number {
  const channel = getChannelById(channelId);
  return channel?.dailyLimit ?? VIDEOS_PER_DAY_PER_CHANNEL;
}

export function isValidChannel(id: string): boolean {
  return CHANNEL_NAMES.some(ch => ch.id === id);
}

export const VIDEOS_PER_DAY_PER_CHANNEL = 3;
export const TOTAL_CHANNELS = 10;
export const PLATFORMS = ['youtube', 'tiktok', 'instagram', 'facebook', 'snapchat', 'pinterest', 'x', 'reddit', 'linkedin', 'twitch', 'kwai', 'likee', 'dzen', 'dailymotion'] as const;
export type Platform = typeof PLATFORMS[number];

// Environment variable interface for channel-based credentials
export interface ChannelEnvVars {
  // Global fallback credentials
  YOUTUBE_CLIENT_ID?: string;
  YOUTUBE_CLIENT_SECRET?: string;
  YOUTUBE_REFRESH_TOKEN?: string;
  TIKTOK_ACCESS_TOKEN?: string;
  TIKTOK_OPEN_ID?: string;
  INSTAGRAM_ACCESS_TOKEN?: string;
  INSTAGRAM_USER_ID?: string;
  FACEBOOK_ACCESS_TOKEN?: string;
  FACEBOOK_PAGE_ID?: string;
  
  // Channel-specific credentials (CHANNEL1_, CHANNEL2_, etc.)
  [key: string]: string | undefined;
}

export interface ChannelPlatformConfigs {
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

// Get channel-specific credentials from environment variables
export function getChannelCredentials(channelId: string, env: ChannelEnvVars): ChannelPlatformConfigs {
  const prefix = channelId.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const configs: ChannelPlatformConfigs = {};

  // Try channel-specific credentials first, fall back to global
  const ytClientId = env[`${prefix}_YOUTUBE_CLIENT_ID`] || env.YOUTUBE_CLIENT_ID;
  const ytClientSecret = env[`${prefix}_YOUTUBE_CLIENT_SECRET`] || env.YOUTUBE_CLIENT_SECRET;
  const ytRefreshToken = env[`${prefix}_YOUTUBE_REFRESH_TOKEN`] || env.YOUTUBE_REFRESH_TOKEN;
  
  if (ytClientId && ytClientSecret && ytRefreshToken) {
    configs.youtube = {
      clientId: ytClientId,
      clientSecret: ytClientSecret,
      refreshToken: ytRefreshToken
    };
  }

  const ttAccessToken = env[`${prefix}_TIKTOK_ACCESS_TOKEN`] || env.TIKTOK_ACCESS_TOKEN;
  const ttOpenId = env[`${prefix}_TIKTOK_OPEN_ID`] || env.TIKTOK_OPEN_ID;
  
  if (ttAccessToken && ttOpenId) {
    configs.tiktok = {
      accessToken: ttAccessToken,
      openId: ttOpenId
    };
  }

  const igAccessToken = env[`${prefix}_INSTAGRAM_ACCESS_TOKEN`] || env.INSTAGRAM_ACCESS_TOKEN;
  const igUserId = env[`${prefix}_INSTAGRAM_USER_ID`] || env.INSTAGRAM_USER_ID;
  
  if (igAccessToken && igUserId) {
    configs.instagram = {
      accessToken: igAccessToken,
      igUserId: igUserId
    };
  }

  const fbAccessToken = env[`${prefix}_FACEBOOK_ACCESS_TOKEN`] || env.FACEBOOK_ACCESS_TOKEN;
  const fbPageId = env[`${prefix}_FACEBOOK_PAGE_ID`] || env.FACEBOOK_PAGE_ID;
  
  if (fbAccessToken && fbPageId) {
    configs.facebook = {
      accessToken: fbAccessToken,
      pageId: fbPageId
    };
  }

  return configs;
}
