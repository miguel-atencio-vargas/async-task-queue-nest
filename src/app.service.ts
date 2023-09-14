import { Injectable } from '@nestjs/common';
import { NotificationsService } from './lib/notifications/notifications.service';
import { NotificationType } from './lib/notifications/notifications.interface';

@Injectable()
export class AppService {
  constructor(private readonly notificationService: NotificationsService) {}
  async sayHello(chatId: string): Promise<void> {
    await this.notificationService.sendMessage({
      chatId,
      type: NotificationType.TELEGRAM,
      metadata: {
        data: `${chatId} says hello from your Nest API`,
      },
    });
  }
}
