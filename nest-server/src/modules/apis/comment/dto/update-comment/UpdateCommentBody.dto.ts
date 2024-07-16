import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCommentBodyDTO {
  @IsOptional()
  @IsString()
  @MinLength(1)
  content?: string;
}
