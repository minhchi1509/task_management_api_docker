import { Expose, Type } from 'class-transformer';

import { CommentResponseDTO } from 'src/common/dto/CommentResponse.dto';

export class UpdateCommentResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => CommentResponseDTO)
  updatedComment: CommentResponseDTO;
}
