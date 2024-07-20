import { DynamicModule, Module } from '@nestjs/common';

import { EProviderKey } from 'src/common/constants/common.enum';
import { RedisService } from 'src/modules/libs/redis/redis.service';
import { RedisUtilsService } from 'src/modules/libs/redis/redis-utils.service';
import {
  IRedisModuleAsyncOptions,
  IRedisModuleOptions
} from 'src/modules/libs/redis/types/redis-module.type';

@Module({})
export class RedisModule {
  static forRootAsync(options: IRedisModuleAsyncOptions): DynamicModule {
    const defaultFactory = (...args: any[]) => null;
    return {
      module: RedisModule,
      imports: options.imports || [],
      providers: [
        RedisService,
        RedisUtilsService,
        {
          provide: EProviderKey.REDIS_OPTIONS,
          useFactory: options.useFactory || defaultFactory,
          inject: options.inject || []
        }
      ],
      exports: [RedisUtilsService],
      global: options.isGlobal ?? false
    };
  }

  static forRoot(options: IRedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        RedisService,
        RedisUtilsService,
        { provide: EProviderKey.REDIS_OPTIONS, useValue: options }
      ],
      exports: [RedisUtilsService],
      global: options.isGlobal ?? false
    };
  }
}
