import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/say-hello/:chatId')
  async sayHello(@Param('chatId') chatId: string) {
    await this.appService.sayHello(chatId);
    return {
      message: 'Check your telegram 📩',
    };
  }
}
