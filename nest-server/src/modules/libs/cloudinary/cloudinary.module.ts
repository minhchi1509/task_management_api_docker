import { DynamicModule, Module } from '@nestjs/common';
import { ConfigOptions, v2 } from 'cloudinary';

import { EProviderKey } from 'src/common/constants/provider-key.constant';
import {
  ICloudinaryModuleAsyncOptions,
  ICloudinaryModuleOptions
} from 'src/common/types/cloudinary-module.type';
import { CloudinaryService } from 'src/modules/libs/cloudinary/cloudinary.service';

@Module({})
export class CloudinaryModule {
  static forRoot(options: ICloudinaryModuleOptions): DynamicModule {
    return {
      module: CloudinaryModule,
      providers: [
        CloudinaryService,
        {
          provide: EProviderKey.CLOUDINARY_PROVIDER,
          useFactory: () => v2.config(options)
        }
      ],
      exports: [CloudinaryService],
      global: options.isGlobal ?? false
    };
  }

  static forRootAsync(options: ICloudinaryModuleAsyncOptions): DynamicModule {
    const defaultFactory = (...args: any[]) => null;
    return {
      module: CloudinaryModule,
      imports: options.imports || [],
      providers: [
        CloudinaryService,
        {
          provide: EProviderKey.CLOUDINARY_OPTIONS,
          useFactory: options.useFactory || defaultFactory,
          inject: options.inject || []
        },
        {
          provide: EProviderKey.CLOUDINARY_PROVIDER,
          useFactory: (cloudinaryOptions?: ConfigOptions) =>
            v2.config(cloudinaryOptions),
          inject: [{ token: EProviderKey.CLOUDINARY_OPTIONS, optional: true }]
        }
      ],
      exports: [CloudinaryService],
      global: options.isGlobal ?? false
    };
  }
}
