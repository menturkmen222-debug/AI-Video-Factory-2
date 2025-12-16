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
      const PAGE_SIZE = 100;
      const matchedLogs: LogEntry[] = [];
      let currentCursor = cursor;
      let hasMoreKeys = true;
      let iterations = 0;
      const MAX_ITERATIONS = 50;

      while (matchedLogs.length < limit && hasMoreKeys && iterations < MAX_ITERATIONS) {
        iterations++;
        
        const listOptions: KVNamespaceListOptions = {
          prefix: 'log:',
          limit: PAGE_SIZE * 2
        };
        
        if (currentCursor) {
          listOptions.cursor = currentCursor;
        }

        const listResult = await this.logsKV.list(listOptions);
        
        if (listResult.keys.length === 0) {
          hasMoreKeys = false;
          break;
        }

        const sortedKeys = [...listResult.keys].sort((a, b) => {
          return b.name.localeCompare(a.name);
        });

        for (const key of sortedKeys) {
          if (matchedLogs.length >= limit) break;

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

        if (listResult.list_complete) {
          hasMoreKeys = false;
          currentCursor = null;
        } else {
          currentCursor = listResult.cursor || null;
          hasMoreKeys = true;
        }
      }

      matchedLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      const resultLogs = matchedLogs.slice(0, limit);

      return {
        logs: resultLogs,
        nextCursor: hasMoreKeys ? currentCursor : null,
        hasMore: hasMoreKeys || matchedLogs.length > limit,
        totalInBatch: resultLogs.length
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

    return true;
  }
}
