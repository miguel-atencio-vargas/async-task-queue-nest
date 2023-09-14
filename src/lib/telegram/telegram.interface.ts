import { ModuleMetadata } from '@nestjs/common';

export interface TelegramOptions {
  token: string;
}

export interface TelegramModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<TelegramOptions> | TelegramOptions;
  inject?: any[];
}
