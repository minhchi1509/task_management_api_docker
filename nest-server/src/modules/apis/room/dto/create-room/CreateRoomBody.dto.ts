import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRoomBodyDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;
}
