import { applyDecorators } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';

export const UseFormData = () => {
  return applyDecorators(ApiConsumes('multipart/form-data'), FormDataRequest());
};
