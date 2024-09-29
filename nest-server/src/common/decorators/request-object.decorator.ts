import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ERequestPayloadKey } from 'src/common/constants/common.enum';
import { TJWTPayload } from 'src/common/types/token.type';

export const RequestHeader = createParamDecorator(
  async (targetDTO: any, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    const headersInstance = plainToInstance(targetDTO, headers);
    return headersInstance;
  }
);

export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: TJWTPayload = request[ERequestPayloadKey.USER];
    return user.sub;
  }
);
