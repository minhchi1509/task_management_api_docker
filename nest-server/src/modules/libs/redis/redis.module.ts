import { Module } from '@nestjs/common';

import { RedisProvider } from 'src/modules/libs/redis/redis.provider';
import { RedisService } from 'src/modules/libs/redis/redis.service';

@Module({
  providers: [RedisProvider, RedisService],
  exports: [RedisService]
})
export class RedisModule {}
