import { DynamicModule, Module } from '@nestjs/common';

import { EProviderKey } from 'src/common/constants/provider-key.constant';
import {
  IRedisModuleAsyncOptions,
  IRedisModuleOptions
} from 'src/common/types/redis-module.type';
import { RedisProvider } from 'src/modules/libs/redis/redis.provider';
import { RedisService } from 'src/modules/libs/redis/redis.service';

@Module({})
export class RedisModule {
  static forRootAsync(options: IRedisModuleAsyncOptions): DynamicModule {
    const defaultFactory = (...args: any[]) => null;
    return {
      module: RedisModule,
      imports: options.imports || [],
      providers: [
        RedisProvider,
        RedisService,
        {
          provide: EProviderKey.REDIS_OPTIONS,
          useFactory: options.useFactory || defaultFactory,
          inject: options.inject || []
        }
      ],
      exports: [RedisService],
      global: options.isGlobal ?? false
    };
  }

  static forRoot(options: IRedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        RedisProvider,
        RedisService,
        { provide: EProviderKey.REDIS_OPTIONS, useValue: options }
      ],
      exports: [RedisService],
      global: options.isGlobal ?? false
    };
  }
}
