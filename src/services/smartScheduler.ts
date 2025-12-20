import { Logger } from '../utils/logger';
import { Platform } from '../config/channels';

/**
 * Peak audience times by platform and timezone
 * Based on platform engagement analytics
 */
export interface AudiencePeakTime {
  platform: Platform;
  timezone: string;
  peakHours: number[]; // 0-23 (UTC)
  description: string;
}

export class SmartSchedulerService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * Get optimal posting time for platform + timezone
   * Respects audience peak hours
   */
  async getOptimalPostingTime(
    platform: Platform,
    timezone: string = 'UTC',
    hoursFromNow: number = 0
  ): Promise<{ time: Date; reason: string }> {
    const peakHours = this.getPeakHoursForPlatform(platform, timezone);
    const now = new Date();
    
    // Find next peak hour
    let nextTime = new Date(now);
    nextTime.setHours(nextTime.getHours() + hoursFromNow);
    
    const nextPeakHour = this.findNextPeakHour(nextTime, peakHours);
    
    await this.logger.info('scheduler', 'Optimal time calculated', {
      platform,
      timezone,
      peakHours: peakHours.join(','),
      scheduledTime: nextPeakHour.toISOString(),
      reason: `Platform ${platform} peak engagement at ${peakHours[0]}:00 ${timezone}`
    });

    return {
      time: nextPeakHour,
      reason: `Posting at ${peakHours[0]}:00 ${timezone} for maximum ${platform} engagement`
    };
  }

  /**
   * Get default language for channel (region-specific)
   */
  getChannelDefaultLanguage(channelId: string): string {
    const languageMap: Record<string, string> = {
      'channel1': 'en',   // Rabbit - English (international)
      'channel2': 'en',   // Panda - English (cute content)
      'channel3': 'en',   // Penguin - English (funny)
      'channel4': 'en',   // Raccoon - English (viral)
      'channel5': 'en',   // Wolf - English (cool factor)
      'channel6': 'ru',   // Hippo - Russian (CIS market)
      'channel7': 'de',   // Owl - German (European)
      'channel8': 'es',   // Crocodile - Spanish (LATAM)
      'channel9': 'en',   // Koala - English (universal)
      'channel10': 'ru'   // Sloth - Russian (trending CIS)
    };

    return languageMap[channelId] || 'en';
  }

  /**
   * Get timezone for channel (region-specific)
   */
  getChannelTimezone(channelId: string): string {
    const timezoneMap: Record<string, string> = {
      'channel1': 'UTC',      // Rabbit - Global
      'channel2': 'UTC',      // Panda - Global
      'channel3': 'UTC',      // Penguin - Global
      'channel4': 'UTC',      // Raccoon - Global
      'channel5': 'UTC',      // Wolf - Global
      'channel6': 'Europe/Moscow',  // Hippo - Russia
      'channel7': 'Europe/Berlin',  // Owl - Germany
      'channel8': 'America/Mexico_City',  // Crocodile - LATAM
      'channel9': 'Australia/Sydney',  // Koala - Australia
      'channel10': 'Asia/Tashkent'  // Sloth - Central Asia
    };

    return timezoneMap[channelId] || 'UTC';
  }

  /**
   * Get best languages for multi-language posting
   */
  getBestLanguagesForChannel(channelId: string, count: number = 5): string[] {
    const defaultLang = this.getChannelDefaultLanguage(channelId);
    const allLanguages = ['en', 'de', 'es', 'ar', 'ru'];
    
    // Move default language to front
    const sorted = allLanguages.filter(l => l === defaultLang)
      .concat(allLanguages.filter(l => l !== defaultLang));
    
    return sorted.slice(0, count);
  }

  private getPeakHoursForPlatform(platform: Platform, timezone: string): number[] {
    const peakHoursMap: Record<Platform, number[]> = {
      youtube: [18, 19, 20, 21, 22],      // Evening (peak watch time)
      tiktok: [18, 19, 20, 21, 22, 23],   // Late evening (youth)
      instagram: [19, 20, 21, 22],        // Evening
      facebook: [20, 21, 22],             // Late evening
      snapchat: [19, 20, 21, 22],         // Evening
      pinterest: [14, 15, 16, 17, 18],    // Afternoon (planning)
      x: [18, 19, 20, 21],                // Evening
      reddit: [20, 21, 22, 23],           // Late evening
      linkedin: [9, 10, 11, 12],          // Morning (work hours)
      twitch: [21, 22, 23, 0, 1],         // Night (gaming)
      kwai: [18, 19, 20, 21, 22],         // Evening (Asian content)
      likee: [18, 19, 20, 21, 22],        // Evening
      dzen: [20, 21, 22, 23],             // Evening (Russian)
      dailymotion: [18, 19, 20, 21]       // Evening
    };

    return peakHoursMap[platform] || [19, 20, 21];
  }

  private findNextPeakHour(startTime: Date, peakHours: number[]): Date {
    const result = new Date(startTime);
    const currentHour = result.getUTCHours();
    
    // Find next peak hour in today
    const todayPeak = peakHours.find(h => h > currentHour);
    if (todayPeak !== undefined) {
      result.setUTCHours(todayPeak, 0, 0, 0);
      return result;
    }
    
    // If no peak hour today, use first peak hour tomorrow
    result.setUTCDate(result.getUTCDate() + 1);
    result.setUTCHours(peakHours[0], 0, 0, 0);
    return result;
  }
}
