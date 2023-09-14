import { Logger } from '@nestjs/common';

interface AbstractChannelConfig {
  logger: Logger;
}

export abstract class AbstractChannel {
  private logger: Logger;

  constructor(config: AbstractChannelConfig) {
    this.logger = config.logger;
  }

  abstract processMessage(message: unknown): Promise<void>;

  public LogAndThrowError(data: object, error: any) {
    if (error instanceof Error) {
      this.logger.error(data, error.message);
      throw error;
    } else {
      this.logger.error(data, error);
      throw new Error(error);
    }
  }
}
