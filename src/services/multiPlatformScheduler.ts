import { Logger } from '../utils/logger';
import { LanguageCode, getLanguageByCode, getLanguageTimezone } from '../config/languages';
import { PlatformId, getPlatformById, getPlatformOptimalHours, PLATFORM_IDS } from '../config/platforms';
import { PublishTarget, VideoTemplate, PlatformMetadata, createPublishTarget } from '../models/videoTemplate';
import { CHANNEL_NAMES, VIDEOS_PER_DAY_PER_CHANNEL } from '../config/channels';

export interface ScheduleConfig {
  channelId: string;
  languageCode: LanguageCode;
  platformIds: PlatformId[];
  videoCount: number;
  startDate: Date;
}

export interface ScheduleSlot {
  time: Date;
  hour: number;
  minute: number;
  platformId: PlatformId;
  channelId: string;
  languageCode: LanguageCode;
  isAvailable: boolean;
}

export interface DailySchedule {
  date: string;
  channelId: string;
  languageCode: LanguageCode;
  slots: ScheduleSlot[];
  videosScheduled: number;
  maxVideos: number;
}

export class MultiPlatformSchedulerService {
  private logger: Logger;
  private scheduledSlots: Map<string, ScheduleSlot[]> = new Map();

  constructor(logger: Logger) {
    this.logger = logger;
  }

  generateScheduleSlots(
    channelId: string,
    languageCode: LanguageCode,
    platformIds: PlatformId[],
    date: Date
  ): ScheduleSlot[] {
    const slots: ScheduleSlot[] = [];
    const timezone = getLanguageTimezone(languageCode);
    const dateKey = this.getDateKey(date, channelId, languageCode);

    for (const platformId of platformIds) {
      const optimalHours = getPlatformOptimalHours(platformId, timezone);
      
      for (let i = 0; i < VIDEOS_PER_DAY_PER_CHANNEL && i < optimalHours.length; i++) {
        const hour = optimalHours[i];
        const minute = Math.floor(Math.random() * 30);
        
        const slotTime = new Date(date);
        slotTime.setHours(hour, minute, 0, 0);

        if (!this.isSlotTaken(dateKey, slotTime, platformId)) {
          slots.push({
            time: slotTime,
            hour,
            minute,
            platformId,
            channelId,
            languageCode,
            isAvailable: true
          });
        }
      }
    }

    slots.sort((a, b) => a.time.getTime() - b.time.getTime());
    return slots;
  }

  async scheduleVideoForAllPlatforms(
    template: VideoTemplate,
    languageCode: LanguageCode,
    platformIds: PlatformId[],
    metadata: PlatformMetadata,
    baseDate?: Date
  ): Promise<PublishTarget[]> {
    const targets: PublishTarget[] = [];
    const date = baseDate || new Date();
    const timezone = getLanguageTimezone(languageCode);

    await this.logger.info('scheduler', 'Scheduling video for platforms', {
      templateId: template.id,
      languageCode,
      platformCount: platformIds.length
    });

    const slots = this.generateScheduleSlots(
      template.channelId,
      languageCode,
      platformIds,
      date
    );

    for (const slot of slots) {
      if (!slot.isAvailable) continue;

      const target = createPublishTarget(
        template.id,
        slot.platformId,
        languageCode,
        template.channelId,
        slot.time.toISOString(),
        timezone,
        metadata
      );

      targets.push(target);

      await this.logger.info('scheduler', 'Created publish target', {
        targetId: target.id,
        platformId: slot.platformId,
        scheduledAt: slot.time.toISOString()
      });
    }

    return targets;
  }

  calculateOptimalUploadTime(
    platformId: PlatformId,
    languageCode: LanguageCode,
    existingSchedules: Date[]
  ): Date {
    const timezone = getLanguageTimezone(languageCode);
    const optimalHours = getPlatformOptimalHours(platformId, timezone);
    const now = new Date();
    
    const existingHours = new Set(
      existingSchedules
        .filter(d => this.isSameDay(d, now))
        .map(d => d.getHours())
    );

    for (const hour of optimalHours) {
      if (!existingHours.has(hour)) {
        const scheduledTime = new Date(now);
        scheduledTime.setHours(hour, Math.floor(Math.random() * 30), 0, 0);
        
        if (scheduledTime > now) {
          return scheduledTime;
        }
      }
    }

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(optimalHours[0], 0, 0, 0);
    return tomorrow;
  }

  validateDailyLimits(
    channelId: string,
    languageCode: LanguageCode,
    currentCount: number
  ): { valid: boolean; remaining: number; error?: string } {
    const maxPerDay = VIDEOS_PER_DAY_PER_CHANNEL;
    const remaining = maxPerDay - currentCount;

    if (currentCount >= maxPerDay) {
      return {
        valid: false,
        remaining: 0,
        error: `Daily limit of ${maxPerDay} videos reached for channel ${channelId}`
      };
    }

    return {
      valid: true,
      remaining
    };
  }

  validateChannelStructure(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const expectedChannels = 5;

    if (CHANNEL_NAMES.length !== expectedChannels) {
      errors.push(`Expected ${expectedChannels} channels, found ${CHANNEL_NAMES.length}`);
    }

    if (VIDEOS_PER_DAY_PER_CHANNEL !== 5) {
      errors.push(`Expected 5 videos per day per channel, configured: ${VIDEOS_PER_DAY_PER_CHANNEL}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  getDailyScheduleSummary(
    channelId: string,
    languageCode: LanguageCode,
    date: Date
  ): DailySchedule {
    const dateKey = this.getDateKey(date, channelId, languageCode);
    const slots = this.scheduledSlots.get(dateKey) || [];

    return {
      date: date.toISOString().split('T')[0],
      channelId,
      languageCode,
      slots,
      videosScheduled: slots.filter(s => !s.isAvailable).length,
      maxVideos: VIDEOS_PER_DAY_PER_CHANNEL
    };
  }

  private getDateKey(date: Date, channelId: string, languageCode: LanguageCode): string {
    const dateStr = date.toISOString().split('T')[0];
    return `${dateStr}_${channelId}_${languageCode}`;
  }

  private isSlotTaken(dateKey: string, time: Date, platformId: PlatformId): boolean {
    const slots = this.scheduledSlots.get(dateKey) || [];
    return slots.some(s => 
      s.platformId === platformId && 
      Math.abs(s.time.getTime() - time.getTime()) < 30 * 60 * 1000
    );
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
