import { SetMetadata, Type } from '@nestjs/common';

import { EMetadataKey } from 'src/common/constants/enum';
import { IPolicyHandler } from 'src/common/types/policy.type';

export const PublicRoute = () =>
  SetMetadata(EMetadataKey.IS_PUBLIC_ROUTE, true);

export const ProtectedRoute = () =>
  SetMetadata(EMetadataKey.IS_PUBLIC_ROUTE, false);

export const CheckPolicy = <T>(handler: Type<IPolicyHandler<T>>) =>
  SetMetadata(EMetadataKey.CHECK_POLICY, handler);
