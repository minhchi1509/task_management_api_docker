import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentBodyDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  content: string;
}
