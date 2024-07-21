import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';

import { EProviderKey } from 'src/common/constants/provider-key.constant';

@Injectable()
export class RedisProvider extends Redis implements OnModuleInit {
  private readonly logger = new Logger(RedisProvider.name);

  constructor(@Inject(EProviderKey.REDIS_OPTIONS) options: RedisOptions) {
    super(options);
  }

  async onModuleInit() {
    try {
      const redisInfo = await this.info();
      await this.config('SET', 'notify-keyspace-events', 'KEA');
      this.logger.log('🚀 Connect to Redis successfully!');
    } catch (error) {
      this.disconnect();
      throw new Error(
        `❌ Connect to Redis failed: ${(error as Error).message}`
      );
    }
  }
}
