import { Expose, Type } from 'class-transformer';

import { CommentResponseDTO } from 'src/common/dto/CommentResponse.dto';
import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';

export class UpdateCommentResponseDTO extends MessageResponseDTO {
  @Expose()
  @Type(() => CommentResponseDTO)
  updatedComment: CommentResponseDTO;
}
