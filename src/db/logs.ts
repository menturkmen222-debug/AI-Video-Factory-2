import { Logger, LogEntry } from '../utils/logger';

export class LogsManager {
  private logger: Logger;

  constructor(logsKV: KVNamespace) {
    this.logger = new Logger(logsKV);
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
}
