import { Expose, Type } from 'class-transformer';

import { CommentResponseDTO } from 'src/common/dto/CommentResponse.dto';

export class GetTaskCommentsResponseDTO {
  @Expose()
  @Type(() => CommentResponseDTO)
  comments: CommentResponseDTO[];
}
