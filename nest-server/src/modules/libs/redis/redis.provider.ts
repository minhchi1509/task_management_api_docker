import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { IEnvironmentVariables } from 'src/common/types/env.type';

@Injectable()
export class RedisProvider extends Redis implements OnModuleInit {
  private readonly logger = new Logger(RedisProvider.name);

  constructor(private configService: ConfigService<IEnvironmentVariables>) {
    super({
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
      password: configService.get<string>('REDIS_PASSWORD')
    });
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
