import { Expose, Type } from 'class-transformer';

import { RoomMemberResponseDTO } from 'src/common/dto/RoomMemberResponse.dto';
import { RoomResponseDTO } from 'src/common/dto/RoomResponse.dto';

export class GetRoomMembersResponseDTO {
  @Expose()
  @Type(() => RoomResponseDTO)
  room: RoomResponseDTO;

  @Expose()
  @Type(() => RoomMemberResponseDTO)
  members: RoomMemberResponseDTO[];
}
