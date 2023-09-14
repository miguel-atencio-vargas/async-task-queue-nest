import { NotImplementedException } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import {
  NotificationType,
  NotificationServiceMessage,
} from './notifications.interface';
import { TelegramChannel } from './channels/telegram.channel';
import { NOTIFICATIONS_QUEUE_NAME } from './notifications.constants';

@Processor(NOTIFICATIONS_QUEUE_NAME)
export class NotificationsProcessor extends WorkerHost {
  constructor(private readonly telegramChannel: TelegramChannel) {
    super();
  }

  async process(job: Job<NotificationServiceMessage>): Promise<void> {
    const { data } = job;

    if (data.type === NotificationType.TELEGRAM) {
      this.telegramChannel.processMessage(data);
    } else {
      throw new NotImplementedException();
    }
  }
}
