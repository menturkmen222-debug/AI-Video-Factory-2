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
  { id: 'channel1', name: 'channel1', displayName: 'Channel 1', topic: 'Technology & Innovation', topicDescription: 'AI, gadgets, software, startups, future tech trends' },
  { id: 'channel2', name: 'channel2', displayName: 'Channel 2', topic: 'Lifestyle & Health', topicDescription: 'Wellness, fitness, nutrition, mental health, daily routines' },
  { id: 'channel3', name: 'channel3', displayName: 'Channel 3', topic: 'Business & Finance', topicDescription: 'Investing, entrepreneurship, money management, career growth' },
  { id: 'channel4', name: 'channel4', displayName: 'Channel 4', topic: 'Entertainment & Comedy', topicDescription: 'Funny moments, reactions, skits, viral trends, pop culture' },
  { id: 'channel5', name: 'channel5', displayName: 'Channel 5', topic: 'Education & Learning', topicDescription: 'Science facts, history, languages, skills, how-to guides' }
] as const;

export type ChannelId = typeof CHANNEL_NAMES[number]['id'];

export function getChannelById(id: string): typeof CHANNEL_NAMES[number] | undefined {
  return CHANNEL_NAMES.find(ch => ch.id === id);
}

export function isValidChannel(id: string): boolean {
  return CHANNEL_NAMES.some(ch => ch.id === id);
}

export const VIDEOS_PER_DAY_PER_CHANNEL = 5;
export const TOTAL_CHANNELS = 5;
export const PLATFORMS = ['youtube', 'tiktok', 'instagram', 'facebook'] as const;
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
