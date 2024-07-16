import { Expose, Type } from 'class-transformer';

import { RoomMemberResponseDTO } from 'src/common/dto/RoomMemberResponse.dto';

export class CommentResponseDTO {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => RoomMemberResponseDTO)
  commentator: RoomMemberResponseDTO;
}
