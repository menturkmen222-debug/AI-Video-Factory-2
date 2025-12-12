export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  step: string;
  message: string;
  data?: Record<string, unknown>;
}

export class Logger {
  private logs: LogEntry[] = [];
  private logsKV: KVNamespace;

  constructor(logsKV: KVNamespace) {
    this.logsKV = logsKV;
  }

  private createEntry(level: LogEntry['level'], step: string, message: string, data?: Record<string, unknown>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      step,
      message,
      data
    };
  }

  async info(step: string, message: string, data?: Record<string, unknown>): Promise<void> {
    const entry = this.createEntry('info', step, message, data);
    this.logs.push(entry);
    await this.persistLog(entry);
    console.log(`[INFO] [${step}] ${message}`, data || '');
  }

  async warn(step: string, message: string, data?: Record<string, unknown>): Promise<void> {
    const entry = this.createEntry('warn', step, message, data);
    this.logs.push(entry);
    await this.persistLog(entry);
    console.warn(`[WARN] [${step}] ${message}`, data || '');
  }

  async error(step: string, message: string, data?: Record<string, unknown>): Promise<void> {
    const entry = this.createEntry('error', step, message, data);
    this.logs.push(entry);
    await this.persistLog(entry);
    console.error(`[ERROR] [${step}] ${message}`, data || '');
  }

  async debug(step: string, message: string, data?: Record<string, unknown>): Promise<void> {
    const entry = this.createEntry('debug', step, message, data);
    this.logs.push(entry);
    await this.persistLog(entry);
    console.debug(`[DEBUG] [${step}] ${message}`, data || '');
  }

  private async persistLog(entry: LogEntry): Promise<void> {
    try {
      const key = `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await this.logsKV.put(key, JSON.stringify(entry), { expirationTtl: 86400 * 7 });
    } catch (error) {
      console.error('Failed to persist log:', error);
    }
  }

  async getAllLogs(): Promise<LogEntry[]> {
    try {
      const keys = await this.logsKV.list({ prefix: 'log_' });
      const logs: LogEntry[] = [];
      
      for (const key of keys.keys) {
        const value = await this.logsKV.get(key.name);
        if (value) {
          logs.push(JSON.parse(value));
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
      const keys = await this.logsKV.list({ prefix: 'log_' });
      for (const key of keys.keys) {
        await this.logsKV.delete(key.name);
      }
    } catch (error) {
      console.error('Failed to clear logs:', error);
      throw error;
    }
  }
}
