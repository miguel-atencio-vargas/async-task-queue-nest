import { Module } from '@nestjs/common';
import { ConfigModule } from './lib/config/config.module';
import { AppController } from './app.controller';
import { BullMQModule } from './lib/bullmq.module';
import { AppService } from './app.service';
import { NotificationsModule } from './lib/notifications/notifications.module';

@Module({
  imports: [BullMQModule, ConfigModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
