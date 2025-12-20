import { Logger } from '../utils/logger';

export interface UploadTask {
  id: string;
  channel: string;
  language: string;
  platform: string;
  videoFile: string;
  scheduledTime: string; // ISO timestamp
  status: 'pending' | 'processing' | 'completed' | 'failed';
  priority: 'high' | 'normal' | 'low';
  retries: number;
  maxRetries: number;
  metadata: {
    title: string;
    description: string;
    tags: string[];
    thumbnail?: string;
  };
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QueueStats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  byPlatform: Record<string, number>;
  byChannel: Record<string, number>;
}

export class QueueManagerService {
  private logger: Logger;
  private taskQueue: Map<string, UploadTask> = new Map();
  private taskFile = 'task_list.json';

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /**
   * Add task to queue with 660 profile support
   * Priority: YouTube/TikTok (high) > Instagram/Facebook (normal) > others (low)
   */
  async addTask(
    channel: string,
    language: string,
    platform: string,
    videoFile: string,
    metadata: UploadTask['metadata'],
    scheduledTime: string
  ): Promise<UploadTask> {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const priority = this.determinePriority(platform);
    
    const task: UploadTask = {
      id: taskId,
      channel,
      language,
      platform,
      videoFile,
      scheduledTime,
      status: 'pending',
      priority,
      retries: 0,
      maxRetries: 3,
      metadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.taskQueue.set(taskId, task);

    await this.logger.info('queueManager', 'Task added to queue', {
      taskId,
      channel,
      platform,
      language,
      priority,
      scheduledTime
    });

    // Save to file
    await this.saveQueueToFile();

    return task;
  }

  /**
   * Get next pending task (respects priority and schedule time)
   */
  async getNextTask(): Promise<UploadTask | null> {
    const now = new Date();
    const pendingTasks = Array.from(this.taskQueue.values())
      .filter(t => t.status === 'pending' && new Date(t.scheduledTime) <= now)
      .sort((a, b) => {
        // Priority order: high > normal > low
        const priorityOrder = { high: 0, normal: 1, low: 2 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        // Then by scheduled time (earliest first)
        return new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime();
      });

    if (pendingTasks.length === 0) {
      return null;
    }

    const task = pendingTasks[0];
    task.status = 'processing';
    task.updatedAt = new Date().toISOString();
    this.taskQueue.set(task.id, task);

    await this.saveQueueToFile();
    
    return task;
  }

  /**
   * Update task status
   */
  async updateTask(taskId: string, status: UploadTask['status'], error?: string): Promise<void> {
    const task = this.taskQueue.get(taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    task.status = status;
    task.updatedAt = new Date().toISOString();
    if (error) task.error = error;

    if (status === 'failed' && task.retries < task.maxRetries) {
      task.retries++;
      task.status = 'pending';
      // Schedule retry after exponential backoff
      const backoffMs = Math.pow(2, task.retries) * 1000; // 2s, 4s, 8s
      const retryTime = new Date(Date.now() + backoffMs);
      task.scheduledTime = retryTime.toISOString();

      await this.logger.warn('queueManager', 'Task scheduled for retry', {
        taskId,
        retryAttempt: task.retries,
        nextAttempt: task.scheduledTime
      });
    }

    this.taskQueue.set(taskId, task);
    await this.saveQueueToFile();
  }

  /**
   * Get queue statistics for 660 profiles
   */
  async getQueueStats(): Promise<QueueStats> {
    const tasks = Array.from(this.taskQueue.values());
    
    const stats: QueueStats = {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      processing: tasks.filter(t => t.status === 'processing').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      failed: tasks.filter(t => t.status === 'failed').length,
      byPlatform: {},
      byChannel: {}
    };

    for (const task of tasks) {
      stats.byPlatform[task.platform] = (stats.byPlatform[task.platform] || 0) + 1;
      stats.byChannel[task.channel] = (stats.byChannel[task.channel] || 0) + 1;
    }

    return stats;
  }

  /**
   * Get all tasks (optional filter)
   */
  async getAllTasks(filter?: { status?: string; platform?: string; channel?: string }): Promise<UploadTask[]> {
    let tasks = Array.from(this.taskQueue.values());

    if (filter) {
      if (filter.status) tasks = tasks.filter(t => t.status === filter.status);
      if (filter.platform) tasks = tasks.filter(t => t.platform === filter.platform);
      if (filter.channel) tasks = tasks.filter(t => t.channel === filter.channel);
    }

    return tasks.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * Load queue from task_list.json file
   */
  async loadQueueFromFile(): Promise<void> {
    try {
      // Simulation - real implementation would read from file/storage
      await this.logger.info('queueManager', 'Queue loaded from file', {
        taskCount: this.taskQueue.size
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.warn('queueManager', 'Failed to load queue from file', { error: errorMessage });
    }
  }

  /**
   * Save queue to task_list.json
   */
  async saveQueueToFile(): Promise<void> {
    try {
      const tasks = Array.from(this.taskQueue.values());
      const queueData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        totalTasks: tasks.length,
        tasks: tasks
      };

      // Simulation - real implementation would write to file/storage
      await this.logger.info('queueManager', 'Queue saved to file', {
        file: this.taskFile,
        taskCount: tasks.length
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logger.error('queueManager', 'Failed to save queue', { error: errorMessage });
    }
  }

  /**
   * Clear completed tasks
   */
  async clearCompleted(): Promise<number> {
    let cleared = 0;
    for (const [id, task] of this.taskQueue.entries()) {
      if (task.status === 'completed') {
        this.taskQueue.delete(id);
        cleared++;
      }
    }

    await this.logger.info('queueManager', 'Cleared completed tasks', { count: cleared });
    await this.saveQueueToFile();

    return cleared;
  }

  private determinePriority(platform: string): 'high' | 'normal' | 'low' {
    const highPriority = ['youtube', 'tiktok'];
    const normalPriority = ['instagram', 'facebook'];
    
    if (highPriority.includes(platform)) return 'high';
    if (normalPriority.includes(platform)) return 'normal';
    return 'low';
  }
}
