import { SetMetadata, Type } from '@nestjs/common';

import { EMetadataKey } from 'src/common/constants/common.enum';
import { IPermissionHandler } from 'src/common/types/common.type';

export const PublicRoute = () =>
  SetMetadata(EMetadataKey.IS_PUBLIC_ROUTE, true);

export const ProtectedRoute = () =>
  SetMetadata(EMetadataKey.IS_PUBLIC_ROUTE, false);

export const CheckPermission = <T>(handler: Type<IPermissionHandler<T>>) =>
  SetMetadata(EMetadataKey.CHECK_PERMISSION, handler);
