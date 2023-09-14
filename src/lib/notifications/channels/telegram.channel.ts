import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TelegramService } from '../../telegram/telegram.service';
import { TelegramMessage } from '../notifications.interface';
import { IConfig } from '../../../lib/config/config.interface';

import { AbstractChannel } from './abstract.channel';

@Injectable()
export class TelegramChannel extends AbstractChannel {
  constructor(
    private readonly telegramService: TelegramService,
  ) {
    super({
      logger: new Logger(TelegramChannel.name),
    });
  }
  async processMessage(message: TelegramMessage): Promise<void> {
    const {
      chatId,
      metadata: { data },
    } = message;
    await this.telegramService.sendMessage(data, chatId);
  }
}
