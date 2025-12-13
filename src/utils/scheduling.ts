export interface ScheduleSlot {
  hour: number;
  minute: number;
  priority: number;
}

export const US_OPTIMAL_TIMES: ScheduleSlot[] = [
  { hour: 9, minute: 0, priority: 8 },
  { hour: 12, minute: 0, priority: 9 },
  { hour: 15, minute: 0, priority: 10 },
  { hour: 18, minute: 0, priority: 10 },
  { hour: 21, minute: 0, priority: 9 },
];

export function getNextOptimalSlot(channelId: string, videosPostedToday: number): Date {
  const now = new Date();
  const estOffset = -5;
  const utcHour = now.getUTCHours();
  const estHour = (utcHour + estOffset + 24) % 24;
  
  const availableSlots = US_OPTIMAL_TIMES.filter((slot, index) => {
    const slotUsed = index < videosPostedToday;
    const slotPassed = slot.hour <= estHour;
    return !slotUsed && !slotPassed;
  });
  
  if (availableSlots.length === 0) {
    const tomorrow = new Date(now);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    tomorrow.setUTCHours(US_OPTIMAL_TIMES[0].hour - estOffset, US_OPTIMAL_TIMES[0].minute, 0, 0);
    return tomorrow;
  }
  
  const nextSlot = availableSlots[0];
  const scheduledTime = new Date(now);
  scheduledTime.setUTCHours(nextSlot.hour - estOffset, nextSlot.minute, 0, 0);
  
  return scheduledTime;
}

export function isWithinOptimalWindow(): boolean {
  const now = new Date();
  const estOffset = -5;
  const utcHour = now.getUTCHours();
  const estHour = (utcHour + estOffset + 24) % 24;
  
  return US_OPTIMAL_TIMES.some(slot => 
    Math.abs(slot.hour - estHour) <= 1
  );
}

export function getUSTimeInfo(): { hour: number; minute: number; isOptimal: boolean } {
  const now = new Date();
  const estOffset = -5;
  const utcHour = now.getUTCHours();
  const utcMinute = now.getUTCMinutes();
  const estHour = (utcHour + estOffset + 24) % 24;
  
  return {
    hour: estHour,
    minute: utcMinute,
    isOptimal: isWithinOptimalWindow()
  };
}
