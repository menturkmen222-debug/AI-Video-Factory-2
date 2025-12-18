import { Logger } from '../utils/logger';
import { PlatformId, getPlatformById, PLATFORM_IDS } from '../config/platforms';
import { BasePlatformUploader, UploadResult, PlatformCredentials } from './base';
import { YouTubeUploader, YouTubeConfig } from './youtube';
import { TikTokUploader, TikTokConfig } from './tiktok';
import { InstagramUploader, InstagramConfig } from './instagram';
import { FacebookUploader, FacebookConfig } from './facebook';
import { SnapchatUploader } from './snapchat';
import { PinterestUploader } from './pinterest';
import { XUploader } from './x';
import { RedditUploader } from './reddit';
import { LinkedInUploader } from './linkedin';
import { TwitchUploader } from './twitch';
import { KwaiUploader } from './kwai';
import { LikeeUploader } from './likee';
import { DzenUploader } from './dzen';
import { RumbleUploader } from './rumble';
import { OdyseeUploader } from './odysee';
import { DailymotionUploader } from './dailymotion';
import { PlatformMetadata } from '../models/videoTemplate';
import { VideoMetadata } from '../db/queue';

export { BasePlatformUploader, UploadResult, PlatformCredentials } from './base';
export { YouTubeUploader, YouTubeConfig } from './youtube';
export { TikTokUploader, TikTokConfig } from './tiktok';
export { InstagramUploader, InstagramConfig } from './instagram';
export { FacebookUploader, FacebookConfig } from './facebook';

export type AllPlatformConfigs = {
  youtube?: YouTubeConfig;
  tiktok?: TikTokConfig;
  instagram?: InstagramConfig;
  facebook?: FacebookConfig;
} & Record<string, PlatformCredentials | undefined>;

export function createPlatformUploader(
  platformId: PlatformId,
  credentials: PlatformCredentials,
  logger: Logger
): BasePlatformUploader | null {
  const platform = getPlatformById(platformId);
  if (!platform || !platform.enabled) {
    return null;
  }

  switch (platformId) {
    case 'youtube':
      if (credentials.clientId && credentials.clientSecret && credentials.refreshToken) {
        return new YouTubeUploader(
          {
            clientId: credentials.clientId,
            clientSecret: credentials.clientSecret,
            refreshToken: credentials.refreshToken
          },
          logger
        ) as unknown as BasePlatformUploader;
      }
      break;
    case 'tiktok':
      if (credentials.accessToken && credentials.openId) {
        return new TikTokUploader(
          {
            accessToken: credentials.accessToken,
            openId: credentials.openId
          },
          logger
        ) as unknown as BasePlatformUploader;
      }
      break;
    case 'instagram':
      if (credentials.accessToken && credentials.userId) {
        return new InstagramUploader(
          {
            accessToken: credentials.accessToken,
            igUserId: credentials.userId
          },
          logger
        ) as unknown as BasePlatformUploader;
      }
      break;
    case 'facebook':
      if (credentials.accessToken && credentials.pageId) {
        return new FacebookUploader(
          {
            accessToken: credentials.accessToken,
            pageId: credentials.pageId
          },
          logger
        ) as unknown as BasePlatformUploader;
      }
      break;
    case 'snapchat':
      return new SnapchatUploader(credentials, logger);
    case 'pinterest':
      return new PinterestUploader(credentials, logger);
    case 'x':
      return new XUploader(credentials, logger);
    case 'reddit':
      return new RedditUploader(credentials, logger);
    case 'linkedin':
      return new LinkedInUploader(credentials, logger);
    case 'twitch':
      return new TwitchUploader(credentials, logger);
    case 'kwai':
      return new KwaiUploader(credentials, logger);
    case 'likee':
      return new LikeeUploader(credentials, logger);
    case 'dzen':
      return new DzenUploader(credentials, logger);
    case 'rumble':
      return new RumbleUploader(credentials, logger);
    case 'odysee':
      return new OdyseeUploader(credentials, logger);
    case 'dailymotion':
      return new DailymotionUploader(credentials, logger);
    default:
      return null;
  }
  return null;
}

export async function uploadToAllPlatforms(
  videoUrl: string,
  metadata: PlatformMetadata | VideoMetadata,
  channelId: string,
  platformIds: PlatformId[],
  credentials: Record<PlatformId, PlatformCredentials>,
  logger: Logger
): Promise<Record<PlatformId, UploadResult>> {
  const results: Record<string, UploadResult> = {};

  const platformMetadata: PlatformMetadata = 'cta' in metadata 
    ? metadata as PlatformMetadata
    : {
        title: (metadata as VideoMetadata).title,
        description: (metadata as VideoMetadata).description,
        hashtags: (metadata as VideoMetadata).tags || [],
        cta: ''
      };

  const uploadPromises = platformIds.map(async (platformId) => {
    const creds = credentials[platformId];
    if (!creds) {
      results[platformId] = {
        success: false,
        error: `No credentials configured for ${platformId}`
      };
      return;
    }

    const uploader = createPlatformUploader(platformId, creds, logger);
    if (!uploader) {
      results[platformId] = {
        success: false,
        error: `Platform ${platformId} is not enabled or misconfigured`
      };
      return;
    }

    try {
      results[platformId] = await uploader.upload(videoUrl, platformMetadata, channelId);
    } catch (error) {
      results[platformId] = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  });

  await Promise.all(uploadPromises);
  return results as Record<PlatformId, UploadResult>;
}

export function getConfiguredPlatforms(
  credentials: AllPlatformConfigs
): PlatformId[] {
  const configured: PlatformId[] = [];

  for (const platformId of PLATFORM_IDS) {
    const creds = credentials[platformId];
    if (creds && Object.keys(creds).length > 0) {
      configured.push(platformId);
    }
  }

  return configured;
}
