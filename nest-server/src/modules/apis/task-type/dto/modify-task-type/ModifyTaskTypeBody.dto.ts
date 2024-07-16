import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ModifyTaskTypeBodyDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;
}
