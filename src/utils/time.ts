export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function getCurrentTimestamp(): number {
  return Date.now();
}

export function formatDate(date: Date): string {
  return date.toISOString();
}

export function isToday(dateString: string): boolean {
  return dateString === getCurrentDate();
}

export function getDayKey(platform: string, channelId: string): string {
  const date = getCurrentDate();
  return `daily_${platform}_${channelId}_${date}`;
}

export function parseTimestamp(timestamp: string): Date {
  return new Date(timestamp);
}

export function getExpirationTtl(hours: number): number {
  return hours * 60 * 60;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
