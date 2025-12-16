import { Logger, LogEntry } from '../utils/logger';

export interface PaginatedLogsResult {
  logs: LogEntry[];
  nextCursor: string | null;
  hasMore: boolean;
  totalInBatch: number;
}

export interface LogFilters {
  level?: LogEntry['level'];
  source?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export class LogsManager {
  private logger: Logger;
  private logsKV: KVNamespace;

  constructor(logsKV: KVNamespace) {
    this.logger = new Logger(logsKV);
    this.logsKV = logsKV;
  }

  getLogger(): Logger {
    return this.logger;
  }

  async getAllLogs(): Promise<LogEntry[]> {
    return this.logger.getAllLogs();
  }

  async clearLogs(): Promise<void> {
    return this.logger.clearLogs();
  }

  async getLogsByLevel(level: LogEntry['level']): Promise<LogEntry[]> {
    const logs = await this.getAllLogs();
    return logs.filter(log => log.level === level);
  }

  async getLogsByStep(step: string): Promise<LogEntry[]> {
    const logs = await this.getAllLogs();
    return logs.filter(log => log.step === step);
  }

  async getRecentLogs(count: number = 100): Promise<LogEntry[]> {
    const logs = await this.getAllLogs();
    return logs.slice(0, count);
  }

  async getPaginatedLogs(
    cursor: string | null = null,
    limit: number = 100,
    filters: LogFilters = {}
  ): Promise<PaginatedLogsResult> {
    try {
      const BATCH_LIMIT = 100;
      const effectiveLimit = Math.min(limit, BATCH_LIMIT);
      
      const allKeys: { name: string }[] = [];
      let kvCursor: string | undefined = undefined;
      let listComplete = false;
      
      while (!listComplete) {
        const listOptions: KVNamespaceListOptions = {
          prefix: 'log:',
          limit: 1000
        };
        
        if (kvCursor) {
          listOptions.cursor = kvCursor;
        }
        
        const listResult = await this.logsKV.list(listOptions);
        allKeys.push(...listResult.keys);
        
        if (listResult.list_complete) {
          listComplete = true;
        } else {
          kvCursor = listResult.cursor;
        }
      }
      
      allKeys.sort((a, b) => b.name.localeCompare(a.name));
      
      let startIndex = 0;
      if (cursor) {
        const cursorIndex = allKeys.findIndex(k => k.name === cursor);
        if (cursorIndex !== -1) {
          startIndex = cursorIndex + 1;
        }
      }
      
      const matchedLogs: LogEntry[] = [];
      let lastProcessedKey: string | null = null;
      
      for (let i = startIndex; i < allKeys.length && matchedLogs.length < effectiveLimit; i++) {
        const key = allKeys[i];
        lastProcessedKey = key.name;
        
        const value = await this.logsKV.get(key.name);
        if (!value) continue;
        
        try {
          const log: LogEntry = JSON.parse(value);
          
          if (!log.source && log.step) {
            log.source = this.inferSource(log.step);
          }
          if (!log.id) {
            log.id = key.name.split(':').pop() || key.name;
          }
          
          if (this.matchesFilters(log, filters)) {
            matchedLogs.push(log);
          }
        } catch (e) {
          console.error('Failed to parse log entry:', e);
        }
      }
      
      const processedUpTo = lastProcessedKey ? allKeys.findIndex(k => k.name === lastProcessedKey) : -1;
      const hasMoreKeys = processedUpTo !== -1 && processedUpTo < allKeys.length - 1;
      
      const nextCursor = hasMoreKeys && lastProcessedKey ? lastProcessedKey : null;
      
      matchedLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      return {
        logs: matchedLogs,
        nextCursor,
        hasMore: !!nextCursor,
        totalInBatch: matchedLogs.length
      };
    } catch (error) {
      console.error('Failed to get paginated logs:', error);
      throw error;
    }
  }

  private inferSource(step: string): string {
    const sourceMap: Record<string, string> = {
      'router': 'system',
      'cron': 'system',
      'upload': 'service',
      'schedule': 'service',
      'stats': 'service',
      'youtube': 'platform',
      'tiktok': 'platform',
      'instagram': 'platform',
      'facebook': 'platform',
      'cloudinary': 'service',
      'groq': 'service',
      'queue': 'service'
    };
    return sourceMap[step.toLowerCase()] || 'system';
  }

  private matchesFilters(log: LogEntry, filters: LogFilters): boolean {
    if (filters.level && log.level !== filters.level) {
      return false;
    }

    if (filters.source && log.source !== filters.source) {
      return false;
    }

    if (filters.startDate) {
      const logTime = new Date(log.timestamp).getTime();
      const startTime = new Date(filters.startDate).getTime();
      if (logTime < startTime) {
        return false;
      }
    }

    if (filters.endDate) {
      const logTime = new Date(log.timestamp).getTime();
      const endTime = new Date(filters.endDate).getTime();
      if (logTime > endTime) {
        return false;
      }
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const message = (log.message || '').toLowerCase();
      const stack = (log.stack || '').toLowerCase();
      const step = (log.step || '').toLowerCase();
      const messageMatch = message.includes(searchLower);
      const stackMatch = stack.includes(searchLower);
      const stepMatch = step.includes(searchLower);
      if (!messageMatch && !stackMatch && !stepMatch) {
        return false;
      }
    }

    return true;
  }
}
