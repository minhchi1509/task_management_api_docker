import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAwardBodyDTO {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @IsOptional()
  @IsNumber()
  minScore?: number;
}
