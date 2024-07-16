import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from 'src/common/decorators/sanitizer/trim.sanitizer';

export class LoginBodyDTO {
  @Trim()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Trim()
  @IsNotEmpty()
  @IsString()
  password: string;
}
