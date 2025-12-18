export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  source: string;
  step: string;
  message: string;
  data?: Record<string, unknown>;
  stack?: string;
}

export interface LogContext {
  step: string;
  source?: string;
}

export class Logger {
  private logs: LogEntry[] = [];
  private logsKV: KVNamespace;

  constructor(logsKV: KVNamespace) {
    this.logsKV = logsKV;
  }

  private createEntry(
    level: LogEntry['level'],
    step: string,
    message: string,
    data?: Record<string, unknown>,
    source?: string,
    stack?: string
  ): LogEntry {
    const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      id,
      timestamp: new Date().toISOString(),
      level,
      source: source || this.inferSource(step),
      step,
      message,
      data,
      stack
    };
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

  async info(step: string, message: string, data?: Record<string, unknown>, source?: string): Promise<void> {
    const entry = this.createEntry('info', step, message, data, source);
    this.logs.push(entry);
    // info loglar KV ga ketmaydi
    console.log(`[INFO] [${entry.source}/${step}] ${message}`, data || '');
  }

  async warn(step: string, message: string, data?: Record<string, unknown>, source?: string): Promise<void> {
    const entry = this.createEntry('warn', step, message, data, source);
    this.logs.push(entry);
    await this.persistLog(entry);
    console.warn(`[WARN] [${entry.source}/${step}] ${message}`, data || '');
  }

  async error(step: string, message: string, data?: Record<string, unknown>, source?: string, error?: Error): Promise<void> {
    const stack = error?.stack || (data?.error instanceof Error ? (data.error as Error).stack : undefined);
    const entry = this.createEntry('error', step, message, data, source, stack as string | undefined);
    this.logs.push(entry);
    await this.persistLog(entry);
    console.error(`[ERROR] [${entry.source}/${step}] ${message}`, data || '');
    if (stack) console.error(stack);
  }

  async debug(step: string, message: string, data?: Record<string, unknown>, source?: string): Promise<void> {
    const entry = this.createEntry('debug', step, message, data, source);
    this.logs.push(entry);
    await this.persistLog(entry);
    console.debug(`[DEBUG] [${entry.source}/${step}] ${message}`, data || '');
  }

  private async persistLog(entry: LogEntry): Promise<void> {
    try {
      // faqat warn va error loglar KV ga yozilsin
      if (entry.level === 'info') return;

      const key = `log:${entry.timestamp.replace(/[-:.TZ]/g, '')}:${entry.id}`;
      await this.logsKV.put(key, JSON.stringify(entry), { expirationTtl: 86400 * 7 });
    } catch (error) {
      console.error('Failed to persist log:', error);
    }
  }

  async getAllLogs(): Promise<LogEntry[]> {
    try {
      const keys = await this.logsKV.list({ prefix: 'log:' });
      const logs: LogEntry[] = [];

      for (const key of keys.keys) {
        const value = await this.logsKV.get(key.name);
        if (value) {
          const parsed = JSON.parse(value);
          if (!parsed.source && parsed.step) {
            parsed.source = this.inferSource(parsed.step);
          }
          if (!parsed.id) {
            parsed.id = key.name.split(':').pop() || key.name;
          }
          logs.push(parsed);
        }
      }

      return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
      console.error('Failed to get logs:', error);
      return [];
    }
  }

  async clearLogs(): Promise<void> {
    try {
      const keys = await this.logsKV.list({ prefix: 'log:' });
      for (const key of keys.keys) {
        await this.logsKV.delete(key.name);
      }
      const oldKeys = await this.logsKV.list({ prefix: 'log_' });
      for (const key of oldKeys.keys) {
        await this.logsKV.delete(key.name);
      }
    } catch (error) {
      console.error('Failed to clear logs:', error);
      throw error;
    }
  }
      }
