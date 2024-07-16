import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ERequestPayloadKey } from 'src/common/constants/enum';
import { TJWTPayload } from 'src/modules/libs/jwt-utils/types/jwt.type';

export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: TJWTPayload = request[ERequestPayloadKey.USER];
    return user.sub;
  }
);
