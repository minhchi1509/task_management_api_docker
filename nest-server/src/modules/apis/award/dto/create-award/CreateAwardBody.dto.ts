import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

import { Trim } from 'src/common/decorators/sanitizer/trim.sanitizer';

export class CreateAwardBodyDTO {
  @Trim()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  minScore: number;
}
