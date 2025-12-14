import { Logger } from '../utils/logger';

export type NotificationType = 'error' | 'success' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  data?: Record<string, unknown>;
}

export class NotificationManager {
  private kv: KVNamespace;
  private logger: Logger;

  constructor(kv: KVNamespace, logger: Logger) {
    this.kv = kv;
    this.logger = logger;
  }

  async createNotification(
    type: NotificationType,
    title: string,
    message: string,
    data?: Record<string, unknown>
  ): Promise<Notification> {
    const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const notification: Notification = {
      id,
      type,
      title,
      message,
      createdAt: new Date().toISOString(),
      read: false,
      data
    };

    await this.kv.put(id, JSON.stringify(notification), { expirationTtl: 86400 * 30 });
    await this.logger.info('notifications', 'Notification created', { id, type, title });

    return notification;
  }

  async getNotification(id: string): Promise<Notification | null> {
    const value = await this.kv.get(id);
    if (!value) return null;
    return JSON.parse(value);
  }

  async getAllNotifications(): Promise<Notification[]> {
    const keys = await this.kv.list({ prefix: 'notification_' });
    const notifications: Notification[] = [];

    for (const key of keys.keys) {
      const value = await this.kv.get(key.name);
      if (value) {
        notifications.push(JSON.parse(value));
      }
    }

    return notifications.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getUnreadNotifications(): Promise<Notification[]> {
    const all = await this.getAllNotifications();
    return all.filter(n => !n.read);
  }

  async getUnreadCount(): Promise<number> {
    const unread = await this.getUnreadNotifications();
    return unread.length;
  }

  async markAsRead(id: string): Promise<Notification | null> {
    const notification = await this.getNotification(id);
    if (!notification) {
      await this.logger.warn('notifications', 'Notification not found for marking read', { id });
      return null;
    }

    notification.read = true;
    await this.kv.put(id, JSON.stringify(notification), { expirationTtl: 86400 * 30 });
    await this.logger.info('notifications', 'Notification marked as read', { id });

    return notification;
  }

  async markAllAsRead(): Promise<number> {
    const unread = await this.getUnreadNotifications();
    let count = 0;

    for (const notification of unread) {
      notification.read = true;
      await this.kv.put(notification.id, JSON.stringify(notification), { expirationTtl: 86400 * 30 });
      count++;
    }

    await this.logger.info('notifications', 'All notifications marked as read', { count });
    return count;
  }

  async deleteNotification(id: string): Promise<boolean> {
    const notification = await this.getNotification(id);
    if (!notification) return false;

    await this.kv.delete(id);
    await this.logger.info('notifications', 'Notification deleted', { id });
    return true;
  }

  async clearAllNotifications(): Promise<void> {
    const keys = await this.kv.list({ prefix: 'notification_' });
    for (const key of keys.keys) {
      await this.kv.delete(key.name);
    }
    await this.logger.info('notifications', 'All notifications cleared');
  }
}
