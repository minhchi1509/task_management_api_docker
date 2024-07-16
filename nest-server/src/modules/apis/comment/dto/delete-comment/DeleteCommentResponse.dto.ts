import { Expose, Type } from 'class-transformer';

import { CommentResponseDTO } from 'src/common/dto/CommentResponse.dto';

export class DeleteCommentResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => CommentResponseDTO)
  deletedComment: CommentResponseDTO;
}
