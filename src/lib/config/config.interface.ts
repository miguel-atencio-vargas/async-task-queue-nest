import { ConfigType } from '@nestjs/config';

import { app, redis, telegram } from './configs';

export interface IConfig {
  app: ConfigType<typeof app>;
  redis: ConfigType<typeof redis>;
  telegram: ConfigType<typeof telegram>;
}
