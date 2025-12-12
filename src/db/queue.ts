// src/db/queue.ts
import { Logger } from '../utils/logger';
import { getCurrentTimestamp, getDayKey, getCurrentDate } from '../utils/time';

export type Platform = 'youtube' | 'tiktok' | 'instagram' | 'facebook';
export type VideoStatus = 'pending' | 'processing' | 'uploaded' | 'failed';

export interface VideoMetadata {
  title: string;
  description: string;
  tags: string[];
}

export interface VideoQueueEntry {
  id: string;
  videoUrl: string;
  cloudinaryUrl: string;
  platforms: Platform[]; // ✅
  channelId: string;
  status: VideoStatus;
  metadata?: VideoMetadata;
  createdAt: string;
  updatedAt: string;
  errorMessage?: string;
  retryCount: number;
}

export interface DailyCounter {
  platform: Platform;
  channelId: string;
  date: string;
  count: number;
}

const DAILY_LIMIT = 50;

export class QueueManager {
  private kv: KVNamespace;
  private logger: Logger;

  constructor(kv: KVNamespace, logger: Logger) {
    this.kv = kv;
    this.logger = logger;
  }

  async addToQueue(entry: Omit<VideoQueueEntry, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'retryCount'>): Promise<VideoQueueEntry> {
    const id = `video_${getCurrentTimestamp()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    
    const fullEntry: VideoQueueEntry = {
      ...entry,
      id,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
      retryCount: 0
    };

    await this.kv.put(id, JSON.stringify(fullEntry));
    // ✅ Tuzatildi: entry.platform → entry.platforms
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

    await this.kv.put(id, JSON.stringify(updatedEntry));
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
    const canUpload = count < DAILY_LIMIT;
    
    if (!canUpload) {
      await this.logger.warn('queue', 'Daily limit reached', { platform, channelId, count, limit: DAILY_LIMIT });
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

  async getStats(): Promise<{ pending: number; processing: number; uploaded: number; failed: number }> {
    const keys = await this.kv.list({ prefix: 'video_' });
    const stats = { pending: 0, processing: 0, uploaded: 0, failed: 0 };

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
}
