import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ERequestPayloadKey } from 'src/common/constants/common.enum';
import { TJWTPayload } from 'src/common/types/token.type';

export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: TJWTPayload = request[ERequestPayloadKey.USER];
    return user.sub;
  }
);
