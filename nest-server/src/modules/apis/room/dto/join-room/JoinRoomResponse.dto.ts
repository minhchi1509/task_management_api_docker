import { Expose, Type } from 'class-transformer';

import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';
import { RoomResponseDTO } from 'src/common/dto/RoomResponse.dto';

export class JoinRoomResponseDTO extends MessageResponseDTO {
  @Expose()
  @Type(() => RoomResponseDTO)
  room: RoomResponseDTO;
}
