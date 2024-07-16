import { Expose, Type } from 'class-transformer';

import { RoomResponseDTO } from 'src/common/dto/RoomResponse.dto';

export class JoinRoomResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => RoomResponseDTO)
  room: RoomResponseDTO;
}
