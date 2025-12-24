// src/db/queue.ts
import { Logger } from '../utils/logger';
import { getCurrentTimestamp, getDayKey, getCurrentDate } from '../utils/time';

export type Platform = 'youtube' | 'tiktok' | 'instagram' | 'facebook';
export type VideoStatus = 'pending' | 'processing' | 'uploaded' | 'failed' | 'skipped';

export interface PlatformUploadStatus {
  status: 'pending' | 'uploading' | 'completed' | 'failed' | 'skipped';
  error?: string;
  errorCode?: string;
  uploadedAt?: string;
  platformVideoId?: string;
  platformUrl?: string;
  retryAttempt?: string;
  scheduledAt?: string;
  estimatedUploadTime?: string;
  analytics?: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    revenue?: number | null;
  };
}

export interface GroupedQueueData {
  [platform: string]: {
    [channelId: string]: VideoQueueEntry[];
  };
}

export interface VideoMetadata {
  title: string;
  description: string;
  tags: string[];
}

export interface VideoQueueEntry {
  id: string;
  videoUrl: string;
  cloudinaryUrl: string;
  cloudinaryPublicId?: string;
  platforms: Platform[];
  channelId: string;
  status: VideoStatus;
  metadata?: VideoMetadata;
  videoContext?: string;
  createdAt: string;
  updatedAt: string;
  errorMessage?: string;
  retryCount: number;
  platformStatuses: Record<Platform, PlatformUploadStatus>;
  scheduledAt?: string;
  uploadSchedule?: Record<Platform, string>;
}

export interface DailyCounter {
  platform: Platform;
  channelId: string;
  date: string;
  count: number;
}

// Import channel config for per-channel daily limits
import { getChannelDailyLimit } from '../config/channels';

// Get daily limit for a specific channel (reads from config)
function getDailyLimitForChannel(channelId: string): number {
  return getChannelDailyLimit(channelId);
}

// TTLni statusga qarab aniqlash
function getTTLByStatus(status: string): number | undefined {
  const DAY = 86400; // 1 kun sekundlarda
  switch (status) {
    case 'uploaded':
    case 'completed':
      return DAY * 3; // 3 kun
    case 'failed':
      return DAY * 5; // 5 kun
    case 'skipped':
      return DAY * 10; // 10 kun
    default:
      return undefined; // pending / processing / uploading -> cheksiz
  }
}

export class QueueManager {
  private kv: KVNamespace;
  private logger: Logger;

  constructor(kv: KVNamespace, logger: Logger) {
    this.kv = kv;
    this.logger = logger;
  }

  async addToQueue(entry: Omit<VideoQueueEntry, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'retryCount' | 'platformStatuses'>): Promise<VideoQueueEntry> {
    const id = `video_${getCurrentTimestamp()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    
    const platformStatuses = {} as Record<Platform, PlatformUploadStatus>;
    for (const platform of entry.platforms) {
      platformStatuses[platform] = { status: 'pending' };
    }
    
    const fullEntry: VideoQueueEntry = {
      ...entry,
      id,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      retryCount: 0,
      platformStatuses
    };

    await this.kv.put(id, JSON.stringify(fullEntry));
    await this.logger.info('queue', 'Added video to queue', { id, platforms: entry.platforms });
    
    return fullEntry;
  }

  async getEntry(id: string): Promise<VideoQueueEntry | null> {
    const value = await this.kv.get(id);
    if (!value) return null;
    return JSON.parse(value);
  }

  async updateEntry(id: string, updates: Partial<VideoQueueEntry>): Promise<VideoQueueEntry | null> {
    const entry = await this.getEntry(id);
    if (!entry) {
      await this.logger.error('queue', 'Entry not found for update', { id });
      return null;
    }

    const updatedEntry: VideoQueueEntry = {
      ...entry,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Statusga qarab TTL belgilash
    const ttl = updates.status ? getTTLByStatus(updates.status) : undefined;

    await this.kv.put(id, JSON.stringify(updatedEntry), ttl ? { expirationTtl: ttl } : undefined);
    await this.logger.info('queue', 'Updated queue entry', { id, status: updatedEntry.status });
    
    return updatedEntry;
  }

  async getPendingVideos(limit: number = 10): Promise<VideoQueueEntry[]> {
    const keys = await this.kv.list({ prefix: 'video_' });
    const pendingVideos: VideoQueueEntry[] = [];

    for (const key of keys.keys) {
      if (pendingVideos.length >= limit) break;
      
      const value = await this.kv.get(key.name);
      if (value) {
        const entry: VideoQueueEntry = JSON.parse(value);
        if (entry.status === 'pending') {
          pendingVideos.push(entry);
        }
      }
    }

    return pendingVideos;
  }

  async getVideosByStatus(status: VideoStatus): Promise<VideoQueueEntry[]> {
    const keys = await this.kv.list({ prefix: 'video_' });
    const videos: VideoQueueEntry[] = [];

    for (const key of keys.keys) {
      const value = await this.kv.get(key.name);
      if (value) {
        const entry: VideoQueueEntry = JSON.parse(value);
        if (entry.status === status) {
          videos.push(entry);
        }
      }
    }

    return videos;
  }

  async incrementDailyCounter(platform: Platform, channelId: string): Promise<number> {
    const key = getDayKey(platform, channelId);
    const value = await this.kv.get(key);
    
    let counter: DailyCounter;
    if (value) {
      counter = JSON.parse(value);
      counter.count += 1;
    } else {
      counter = {
        platform,
        channelId,
        date: getCurrentDate(),
        count: 1
      };
    }

    await this.kv.put(key, JSON.stringify(counter), { expirationTtl: 86400 * 2 });
    await this.logger.info('queue', 'Daily counter incremented', { platform, channelId, count: counter.count });
    
    return counter.count;
  }

  async getDailyCount(platform: Platform, channelId: string): Promise<number> {
    const key = getDayKey(platform, channelId);
    const value = await this.kv.get(key);
    
    if (!value) return 0;
    
    const counter: DailyCounter = JSON.parse(value);
    return counter.count;
  }

  async canUpload(platform: Platform, channelId: string): Promise<boolean> {
    const count = await this.getDailyCount(platform, channelId);
    const limit = getDailyLimitForChannel(channelId);
    const canUpload = count < limit;
    
    if (!canUpload) {
      await this.logger.warn('queue', 'Daily limit reached for channel', { platform, channelId, count, limit });
    }
    
    return canUpload;
  }

  async clearQueue(): Promise<void> {
    const keys = await this.kv.list({ prefix: 'video_' });
    for (const key of keys.keys) {
      await this.kv.delete(key.name);
    }
    await this.logger.info('queue', 'Queue cleared');
  }

  async getStats(): Promise<{ pending: number; processing: number; uploaded: number; failed: number; skipped: number }> {
    const keys = await this.kv.list({ prefix: 'video_' });
    const stats = { pending: 0, processing: 0, uploaded: 0, failed: 0, skipped: 0 };

    for (const key of keys.keys) {
      const value = await this.kv.get(key.name);
      if (value) {
        const entry: VideoQueueEntry = JSON.parse(value);
        if (entry.status in stats) {
          stats[entry.status]++;
        }
      }
    }

    return stats;
  }

  async getAllVideos(limit: number = 100): Promise<VideoQueueEntry[]> {
    const keys = await this.kv.list({ prefix: 'video_' });
    const videos: VideoQueueEntry[] = [];

    for (const key of keys.keys) {
      if (videos.length >= limit) break;
      
      const value = await this.kv.get(key.name);
      if (value) {
        const entry: VideoQueueEntry = JSON.parse(value);
        videos.push(entry);
      }
    }

    videos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return videos;
  }

  async updatePlatformStatus(id: string, platform: Platform, status: PlatformUploadStatus): Promise<VideoQueueEntry | null> {
    const entry = await this.getEntry(id);
    if (!entry) {
      await this.logger.error('queue', 'Entry not found for platform status update', { id, platform });
      return null;
    }

    entry.platformStatuses[platform] = status;
    entry.updatedAt = new Date().toISOString();

    // Statusga qarab TTL qo‘shish
    const ttl = getTTLByStatus(status.status);
    await this.kv.put(id, JSON.stringify(entry), ttl ? { expirationTtl: ttl } : undefined);

    await this.logger.info('queue', 'Updated platform status', { id, platform, status: status.status });
    
    return entry;
  }

  async getQueueGroupedByPlatformAndChannel(): Promise<GroupedQueueData> {
    const videos = await this.getAllVideos();
    const grouped: GroupedQueueData = {};

    for (const video of videos) {
      for (const platform of video.platforms) {
        if (!grouped[platform]) {
          grouped[platform] = {};
        }
        if (!grouped[platform][video.channelId]) {
          grouped[platform][video.channelId] = [];
        }
        grouped[platform][video.channelId].push(video);
      }
    }

    return grouped;
  }

  async retryPlatformUpload(id: string, platform: Platform): Promise<VideoQueueEntry | null> {
    const entry = await this.getEntry(id);
    if (!entry) {
      await this.logger.error('queue', 'Entry not found for retry', { id, platform });
      return null;
    }

    if (!entry.platformStatuses[platform]) {
      await this.logger.error('queue', 'Platform not found in entry', { id, platform });
      return null;
    }

    entry.platformStatuses[platform] = { status: 'pending' };
    entry.updatedAt = new Date().toISOString();

    await this.kv.put(id, JSON.stringify(entry));
    await this.logger.info('queue', 'Marked platform for retry', { id, platform });
    
    return entry;
  }
                                                 }
