import { registerAs } from '@nestjs/config';

export const app = registerAs('app', () => ({
  port: process.env.APP_PORT || 3000,
  env: process.env.NODE_ENV || 'dev',
}));
