import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';

import { NOTIFICATIONS_QUEUE_NAME } from './notifications.constants';

import { IConfig } from '../config/config.interface';
import { TelegramModule } from '../telegram/telegram.module';

import { NotificationsService } from './notifications.service';
import { NotificationsProcessor } from './notifications.processor';
import { TelegramChannel } from './channels/telegram.channel';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({ name: NOTIFICATIONS_QUEUE_NAME }),
    TelegramModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfig>) => {
        const token = configService.get('telegram.token', { infer: true });
        return { token };
      },
    }),
  ],
  providers: [NotificationsService, NotificationsProcessor, TelegramChannel],
  exports: [NotificationsService],
})
export class NotificationsModule {}
