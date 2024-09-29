import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';

import { BaseExceptionResponse } from 'src/common/dto/BaseExceptionResponse.dto';

export const UseFormData = () => {
  return applyDecorators(ApiConsumes('multipart/form-data'), FormDataRequest());
};

export const ApiExceptionResponse = (options?: {
  type: Type<unknown>;
  status: HttpStatus;
}) => {
  return applyDecorators(
    ApiResponse({
      type: options?.type || BaseExceptionResponse,
      status: options?.status || '4XX',
      description: 'Exception'
    })
  );
};
