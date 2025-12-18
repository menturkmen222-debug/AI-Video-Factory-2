import { LanguageCode } from '../config/languages';
import { PlatformId } from '../config/platforms';

export interface VideoTemplate {
  id: string;
  baseVideoUrl: string;
  cloudinaryPublicId?: string;
  basePrompt: string;
  baseContext?: string;
  channelId: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'ready' | 'published' | 'archived';
  adaptations: VideoAdaptation[];
  publishTargets: PublishTarget[];
}

export interface VideoAdaptation {
  id: string;
  templateId: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  hashtags: string[];
  cta: string;
  generatedAt: string;
  isApproved: boolean;
  approvedAt?: string;
}

export interface PublishTarget {
  id: string;
  templateId: string;
  platformId: PlatformId;
  languageCode: LanguageCode;
  channelId: string;
  scheduledAt: string;
  timezone: string;
  status: 'scheduled' | 'uploading' | 'published' | 'failed' | 'cancelled';
  publishedAt?: string;
  platformVideoId?: string;
  platformUrl?: string;
  error?: string;
  retryCount: number;
  metadata: PlatformMetadata;
}

export interface PlatformMetadata {
  title: string;
  description: string;
  hashtags: string[];
  cta?: string;
  aspectRatio?: string;
  thumbnailUrl?: string;
}

export interface ChannelLanguageConfig {
  channelId: string;
  languageCode: LanguageCode;
  platformIds: PlatformId[];
  isActive: boolean;
  dailyVideoLimit: number;
  credentials: ChannelCredentials;
}

export interface ChannelCredentials {
  [platformId: string]: {
    isConfigured: boolean;
    lastValidated?: string;
  };
}

export interface DailyUploadTracker {
  date: string;
  channelId: string;
  languageCode: LanguageCode;
  platformId: PlatformId;
  count: number;
  maxCount: number;
}

export function createVideoTemplate(
  baseVideoUrl: string,
  basePrompt: string,
  channelId: string,
  baseContext?: string
): VideoTemplate {
  const now = new Date().toISOString();
  return {
    id: `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    baseVideoUrl,
    basePrompt,
    baseContext,
    channelId,
    createdAt: now,
    updatedAt: now,
    status: 'draft',
    adaptations: [],
    publishTargets: []
  };
}

export function createVideoAdaptation(
  templateId: string,
  languageCode: LanguageCode,
  title: string,
  description: string,
  hashtags: string[],
  cta: string
): VideoAdaptation {
  return {
    id: `adapt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    templateId,
    languageCode,
    title,
    description,
    hashtags,
    cta,
    generatedAt: new Date().toISOString(),
    isApproved: false
  };
}

export function createPublishTarget(
  templateId: string,
  platformId: PlatformId,
  languageCode: LanguageCode,
  channelId: string,
  scheduledAt: string,
  timezone: string,
  metadata: PlatformMetadata
): PublishTarget {
  return {
    id: `target_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    templateId,
    platformId,
    languageCode,
    channelId,
    scheduledAt,
    timezone,
    status: 'scheduled',
    retryCount: 0,
    metadata
  };
}
