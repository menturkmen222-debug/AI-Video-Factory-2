import { Logger } from '../utils/logger';
import { Platform } from '../db/queue';

export interface ScheduledUpload {
  platform: Platform;
  scheduledTime: string;
  estimatedDuration: number;
  reason: string;
}

export class UploadSchedulerService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * Calculate when video will be uploaded to each platform
   * Takes into account platform peak times and daily limits
   */
  calculateSchedule(
    videoCreatedAt: string,
    platforms: Platform[],
    channelId: string
  ): Record<Platform, string> {
    const schedule: Record<Platform, string> = {} as any;
    const createdTime = new Date(videoCreatedAt);
    const now = new Date();
    
    // Platform-specific delays and peak hours (UTC)
    const platformSpecs: Record<Platform, { delayMinutes: number; peakHours: number[] }> = {
      youtube: { delayMinutes: 5, peakHours: [9, 12, 18, 20] },    // YouTube - longer prep time
      tiktok: { delayMinutes: 2, peakHours: [7, 12, 18, 21] },     // TikTok - fastest
      instagram: { delayMinutes: 3, peakHours: [10, 13, 19, 22] },  // Instagram - medium
      facebook: { delayMinutes: 4, peakHours: [11, 14, 19, 20] }    // Facebook - medium-long
    };

    let currentScheduleTime = new Date(now);
    
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i];
      const spec = platformSpecs[platform];
      
      // Add delay for this platform
      currentScheduleTime.setMinutes(currentScheduleTime.getMinutes() + spec.delayMinutes);
      
      // Find next peak hour for this platform
      const scheduledTime = this.findNextPeakHour(currentScheduleTime, spec.peakHours);
      
      schedule[platform] = scheduledTime.toISOString();
      
      // Next platform starts after this one (stagger by platform delay)
      currentScheduleTime = new Date(scheduledTime);
      currentScheduleTime.setMinutes(currentScheduleTime.getMinutes() + 1);
    }

    return schedule;
  }

  /**
   * Find next peak hour for optimal engagement
   */
  private findNextPeakHour(fromTime: Date, peakHours: number[]): Date {
    const result = new Date(fromTime);
    const currentHour = result.getUTCHours();
    
    // Find next peak hour
    let nextPeakHour = peakHours.find(h => h > currentHour);
    
    if (!nextPeakHour) {
      // No peak hour today, use first peak hour tomorrow
      result.setUTCDate(result.getUTCDate() + 1);
      nextPeakHour = peakHours[0];
    }
    
    result.setUTCHours(nextPeakHour, 0, 0, 0);
    return result;
  }

  /**
   * Get human-readable schedule summary
   */
  getScheduleSummary(schedule: Record<Platform, string>): string {
    const entries = Object.entries(schedule)
      .map(([platform, time]) => {
        const date = new Date(time);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        return `${platform.toUpperCase()}: ${hours}:${minutes} UTC (${day})`;
      })
      .join(' | ');
    
    return entries;
  }
}
