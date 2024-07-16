import { Expose, Type } from 'class-transformer';

import { CommentResponseDTO } from 'src/common/dto/CommentResponse.dto';

export class CreateCommentResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => CommentResponseDTO)
  comment: CommentResponseDTO;
}
