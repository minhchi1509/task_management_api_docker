import { ConfigOptions } from 'cloudinary';

export interface ICloudinaryModuleOptions extends ConfigOptions {
  isGlobal?: boolean;
}

export interface ICloudinaryModuleAsyncOptions {
  imports?: any[];
  useFactory?: (...args: any[]) => Promise<ConfigOptions> | ConfigOptions;
  inject?: any[];
  isGlobal?: boolean;
}
