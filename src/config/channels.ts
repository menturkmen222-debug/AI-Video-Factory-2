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
  { id: 'channel1', name: 'channel1', displayName: 'Channel 1' },
  { id: 'channel2', name: 'channel2', displayName: 'Channel 2' },
  { id: 'channel3', name: 'channel3', displayName: 'Channel 3' },
  { id: 'channel4', name: 'channel4', displayName: 'Channel 4' },
  { id: 'channel5', name: 'channel5', displayName: 'Channel 5' }
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
