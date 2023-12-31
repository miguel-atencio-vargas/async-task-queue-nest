import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { NotificationServiceMessage } from './notifications.interface';
import {
  NOTIFICATIONS_JOB_NAME,
  NOTIFICATIONS_QUEUE_NAME,
} from './notifications.constants';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue(NOTIFICATIONS_QUEUE_NAME)
    private readonly notificationQueue: Queue,
  ) {}

  async sendMessage(message: NotificationServiceMessage): Promise<void> {
    await this.notificationQueue.add(NOTIFICATIONS_JOB_NAME, message);
  }
}
