import { Logger } from '../utils/logger';
import { VideoTemplate, VideoAdaptation, PublishTarget } from '../models/videoTemplate';
import { LanguageCode } from '../config/languages';
import { PlatformId } from '../config/platforms';
import { VIDEOS_PER_DAY_PER_CHANNEL, CHANNEL_NAMES, TOTAL_CHANNELS } from '../config/channels';

export interface DailyQuotaEntry {
  date: string;
  channelId: string;
  languageCode: LanguageCode;
  platformId: PlatformId;
  count: number;
  maxCount: number;
}

export class TemplatesManager {
  private kv: KVNamespace;
  private logger: Logger;

  constructor(kv: KVNamespace, logger: Logger) {
    this.kv = kv;
    this.logger = logger;
  }

  async saveTemplate(template: VideoTemplate): Promise<void> {
    const key = `template_${template.id}`;
    await this.kv.put(key, JSON.stringify(template));
    await this.logger.info('templates', 'Template saved', { id: template.id });
  }

  async getTemplate(id: string): Promise<VideoTemplate | null> {
    const key = `template_${id}`;
    const value = await this.kv.get(key);
    if (!value) return null;
    return JSON.parse(value);
  }

  async getAllTemplates(limit: number = 100): Promise<VideoTemplate[]> {
    const keys = await this.kv.list({ prefix: 'template_' });
    const templates: VideoTemplate[] = [];

    for (const key of keys.keys) {
      if (templates.length >= limit) break;
      const value = await this.kv.get(key.name);
      if (value) {
        templates.push(JSON.parse(value));
      }
    }

    return templates;
  }

  async updateTemplate(id: string, updates: Partial<VideoTemplate>): Promise<VideoTemplate | null> {
    const template = await this.getTemplate(id);
    if (!template) return null;

    const updated = {
      ...template,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.saveTemplate(updated);
    return updated;
  }

  async savePublishTarget(target: PublishTarget): Promise<void> {
    const key = `target_${target.id}`;
    await this.kv.put(key, JSON.stringify(target), { expirationTtl: 86400 * 7 });
    await this.logger.info('templates', 'Publish target saved', { 
      id: target.id, 
      platformId: target.platformId,
      status: target.status
    });
  }

  async getPublishTarget(id: string): Promise<PublishTarget | null> {
    const key = `target_${id}`;
    const value = await this.kv.get(key);
    if (!value) return null;
    return JSON.parse(value);
  }

  async updatePublishTarget(id: string, updates: Partial<PublishTarget>): Promise<PublishTarget | null> {
    const target = await this.getPublishTarget(id);
    if (!target) return null;

    const updated = { ...target, ...updates };
    await this.savePublishTarget(updated);
    return updated;
  }

  async getTargetsByTemplate(templateId: string): Promise<PublishTarget[]> {
    const keys = await this.kv.list({ prefix: 'target_' });
    const targets: PublishTarget[] = [];

    for (const key of keys.keys) {
      const value = await this.kv.get(key.name);
      if (value) {
        const target: PublishTarget = JSON.parse(value);
        if (target.templateId === templateId) {
          targets.push(target);
        }
      }
    }

    return targets;
  }

  async getPendingTargets(): Promise<PublishTarget[]> {
    const keys = await this.kv.list({ prefix: 'target_' });
    const targets: PublishTarget[] = [];

    for (const key of keys.keys) {
      const value = await this.kv.get(key.name);
      if (value) {
        const target: PublishTarget = JSON.parse(value);
        if (target.status === 'scheduled') {
          targets.push(target);
        }
      }
    }

    return targets.sort((a, b) => 
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );
  }

  async getFailedTargets(): Promise<PublishTarget[]> {
    const keys = await this.kv.list({ prefix: 'target_' });
    const targets: PublishTarget[] = [];

    for (const key of keys.keys) {
      const value = await this.kv.get(key.name);
      if (value) {
        const target: PublishTarget = JSON.parse(value);
        if (target.status === 'failed') {
          targets.push(target);
        }
      }
    }

    return targets;
  }

  async getDailyQuota(
    channelId: string,
    languageCode: LanguageCode,
    platformId: PlatformId,
    date?: string
  ): Promise<DailyQuotaEntry> {
    const dateStr = date || new Date().toISOString().split('T')[0];
    const key = `quota_${dateStr}_${channelId}_${languageCode}_${platformId}`;
    
    const value = await this.kv.get(key);
    if (value) {
      return JSON.parse(value);
    }

    return {
      date: dateStr,
      channelId,
      languageCode,
      platformId,
      count: 0,
      maxCount: VIDEOS_PER_DAY_PER_CHANNEL
    };
  }

  async incrementDailyQuota(
    channelId: string,
    languageCode: LanguageCode,
    platformId: PlatformId
  ): Promise<DailyQuotaEntry> {
    const quota = await this.getDailyQuota(channelId, languageCode, platformId);
    quota.count += 1;

    const key = `quota_${quota.date}_${channelId}_${languageCode}_${platformId}`;
    await this.kv.put(key, JSON.stringify(quota), { expirationTtl: 86400 * 2 });

    await this.logger.info('templates', 'Daily quota incremented', {
      channelId,
      languageCode,
      platformId,
      count: quota.count,
      maxCount: quota.maxCount
    });

    return quota;
  }

  async canUpload(
    channelId: string,
    languageCode: LanguageCode,
    platformId: PlatformId
  ): Promise<{ allowed: boolean; remaining: number; error?: string }> {
    const quota = await this.getDailyQuota(channelId, languageCode, platformId);
    
    if (quota.count >= quota.maxCount) {
      return {
        allowed: false,
        remaining: 0,
        error: `Daily quota exceeded: ${quota.count}/${quota.maxCount} for ${channelId}/${languageCode}/${platformId}`
      };
    }

    return {
      allowed: true,
      remaining: quota.maxCount - quota.count
    };
  }

  async validateChannelStructure(): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    
    if ((CHANNEL_NAMES.length as number) !== (TOTAL_CHANNELS as number)) {
      errors.push(`Expected ${TOTAL_CHANNELS} channels, found ${CHANNEL_NAMES.length}`);
    }

    if ((VIDEOS_PER_DAY_PER_CHANNEL as number) !== 3) {
      errors.push(`Expected 3 videos per day per channel, found ${VIDEOS_PER_DAY_PER_CHANNEL}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  async getDailyStats(date?: string): Promise<{
    date: string;
    totalUploads: number;
    byChannel: Record<string, number>;
    byPlatform: Record<string, number>;
    byLanguage: Record<string, number>;
  }> {
    const dateStr = date || new Date().toISOString().split('T')[0];
    const keys = await this.kv.list({ prefix: `quota_${dateStr}_` });
    
    const stats = {
      date: dateStr,
      totalUploads: 0,
      byChannel: {} as Record<string, number>,
      byPlatform: {} as Record<string, number>,
      byLanguage: {} as Record<string, number>
    };

    for (const key of keys.keys) {
      const value = await this.kv.get(key.name);
      if (value) {
        const quota: DailyQuotaEntry = JSON.parse(value);
        stats.totalUploads += quota.count;
        stats.byChannel[quota.channelId] = (stats.byChannel[quota.channelId] || 0) + quota.count;
        stats.byPlatform[quota.platformId] = (stats.byPlatform[quota.platformId] || 0) + quota.count;
        stats.byLanguage[quota.languageCode] = (stats.byLanguage[quota.languageCode] || 0) + quota.count;
      }
    }

    return stats;
  }
}
