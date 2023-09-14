import { registerAs } from '@nestjs/config';

export const telegram = registerAs('telegram', () => ({
  serviceDisabled: process.env.TELEGRAM_SERVICE_DISABLED || false,
  token: process.env.TELEGRAM_TOKEN,
}));
