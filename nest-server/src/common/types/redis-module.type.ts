import { RedisOptions } from 'ioredis';

export interface IRedisModuleAsyncOptions {
  imports?: any[];
  useFactory?: (...args: any[]) => Promise<RedisOptions> | RedisOptions;
  inject?: any[];
  isGlobal?: boolean;
}

export interface IRedisModuleOptions extends RedisOptions {
  isGlobal?: boolean;
}
