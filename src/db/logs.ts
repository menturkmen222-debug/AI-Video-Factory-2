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
  private TTL_SECONDS = 86400 * 5; // 5 kun
  private logBatch: LogEntry[] = [];
  private batchTimeout: any = null; // Timeout reference for batch flushing
  private isWriting = false;
  private maxRetries = 3;
  private baseRetryDelay = 100; // ms

  constructor(logsKV: KVNamespace) {
    this.logger = new Logger(logsKV);
    this.logsKV = logsKV;
  }

  getLogger(): Logger {
    return this.logger;
  }

  // --- Rate-limited batch log writing with exponential backoff ---
  async addLog(log: LogEntry): Promise<void> {
    try {
      // فقط warn va error loglarni KV ga yozamiz
      if (log.level === 'info') {
        console.log('INFO log:', log.message); // konsolga chiqarish yetarli
        return;
      }

      // Add to batch queue
      this.logBatch.push(log);

      // Clear existing timeout
      if (this.batchTimeout) {
        clearTimeout(this.batchTimeout);
      }

      // Batch write after 500ms delay to avoid rate limiting
      this.batchTimeout = setTimeout(() => {
        this.flushLogBatch().catch(e => console.error('Failed to flush logs:', e));
      }, 500);

      // If batch is full, flush immediately
      if (this.logBatch.length >= 5) {
        await this.flushLogBatch();
      }
    } catch (e) {
      console.error('Failed to queue log:', e, log);
    }
  }

  // --- Flush batch with exponential backoff retry ---
  private async flushLogBatch(): Promise<void> {
    if (this.isWriting || this.logBatch.length === 0) {
      return;
    }

    this.isWriting = true;
    const batch = this.logBatch.splice(0, 5); // Take max 5 logs per batch
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        // Write all logs in parallel with rate limiting
        const writePromises = batch.map((log) => {
          const key = `log:${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          return this.logsKV.put(key, JSON.stringify(log), { expirationTtl: this.TTL_SECONDS });
        });

        // Add small delay between writes to avoid rate limiting
        const writeWithDelay = writePromises.map((promise, index) =>
          new Promise(resolve => setTimeout(() => resolve(promise), index * 50))
        );

        await Promise.all(writeWithDelay);
        this.isWriting = false;
        return; // Success
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // If 429 error, apply exponential backoff
        if (lastError.message.includes('429')) {
          const delay = this.baseRetryDelay * Math.pow(2, attempt);
          console.warn(`KV rate limit (429), retrying in ${delay}ms...`, { attempt: attempt + 1, maxRetries: this.maxRetries });
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          // Not a rate limit error, don't retry
          break;
        }
      }
    }

    this.isWriting = false;
    if (lastError) {
      console.error('Failed to write logs after retries:', lastError);
      // Re-queue failed logs
      this.logBatch.unshift(...batch);
    }
  }

  async getAllLogs(): Promise<LogEntry[]> {
    try {
      const allKeys: { name: string }[] = [];
      let cursor: string | undefined;
      let listComplete = false;

      while (!listComplete) {
        const result = await this.logsKV.list({ prefix: 'log:', cursor, limit: 1000 });
        allKeys.push(...result.keys);
        cursor = result.list_complete ? undefined : result.cursor;
        listComplete = result.list_complete;
      }

      const logs: LogEntry[] = [];
      for (const key of allKeys) {
        const value = await this.logsKV.get(key.name);
        if (!value) continue;
        try {
          const log: LogEntry = JSON.parse(value);
          logs.push(log);
        } catch (e) {
          console.error('Failed to parse log entry:', e, key.name, value);
        }
      }

      logs.sort((a, b) => (new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      return logs;
    } catch (e) {
      console.error('Failed to fetch all logs:', e);
      return [];
    }
  }

  async clearLogs(): Promise<void> {
    try {
      const allKeys: { name: string }[] = [];
      let cursor: string | undefined;
      let listComplete = false;

      while (!listComplete) {
        const result = await this.logsKV.list({ prefix: 'log:', cursor, limit: 1000 });
        allKeys.push(...result.keys);
        cursor = result.list_complete ? undefined : result.cursor;
        listComplete = result.list_complete;
      }

      // batch delete bilan yozuvlarni o'chirish
      for (const key of allKeys) {
        await this.logsKV.delete(key.name);
      }
    } catch (e) {
      console.error('Failed to clear logs:', e);
    }
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
          limit: 1000,
        };
        if (kvCursor) listOptions.cursor = kvCursor;

        const listResult = await this.logsKV.list(listOptions);
        allKeys.push(...listResult.keys);
        listComplete = listResult.list_complete;
        kvCursor = listResult.list_complete ? undefined : listResult.cursor;
      }

      allKeys.sort((a, b) => b.name.localeCompare(a.name));

      let startIndex = 0;
      if (cursor) {
        const cursorIndex = allKeys.findIndex(k => k.name === cursor);
        if (cursorIndex !== -1) startIndex = cursorIndex + 1;
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
          if (!log.source && log.step) log.source = this.inferSource(log.step);
          if (!log.id) log.id = key.name.split(':').pop() || key.name;

          if (this.matchesFilters(log, filters)) matchedLogs.push(log);
        } catch (e) {
          console.error('Failed to parse log entry:', e, key.name, value);
        }
      }

      const processedUpTo = lastProcessedKey ? allKeys.findIndex(k => k.name === lastProcessedKey) : -1;
      const hasMoreKeys = processedUpTo !== -1 && processedUpTo < allKeys.length - 1;
      const nextCursor = hasMoreKeys && lastProcessedKey ? lastProcessedKey : null;

      return {
        logs: matchedLogs,
        nextCursor,
        hasMore: hasMoreKeys,
        totalInBatch: matchedLogs.length,
      };
    } catch (error) {
      console.error('Failed to get paginated logs:', error);
      return { logs: [], nextCursor: null, hasMore: false, totalInBatch: 0 };
    }
  }

  private inferSource(step: string): string {
    const sourceMap: Record<string, string> = {
      router: 'system',
      cron: 'system',
      upload: 'service',
      schedule: 'service',
      stats: 'service',
      youtube: 'platform',
      tiktok: 'platform',
      instagram: 'platform',
      facebook: 'platform',
      cloudinary: 'service',
      groq: 'service',
      queue: 'service',
    };
    return sourceMap[step.toLowerCase()] || 'system';
  }

  private matchesFilters(log: LogEntry, filters: LogFilters): boolean {
    if (filters.level && log.level !== filters.level) return false;
    if (filters.source && log.source !== filters.source) return false;

    const logTime = new Date(log.timestamp).getTime();
    if (filters.startDate && logTime < new Date(filters.startDate).getTime()) return false;
    if (filters.endDate && logTime > new Date(filters.endDate).getTime()) return false;

    if (filters.search) {
      const s = filters.search.toLowerCase();
      const message = (log.message || '').toLowerCase();
      const stack = (log.stack || '').toLowerCase();
      const step = (log.step || '').toLowerCase();
      if (!message.includes(s) && !stack.includes(s) && !step.includes(s)) return false;
    }

    return true;
  }
          }
