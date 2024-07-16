import { Expose, Type } from 'class-transformer';

import { RoomResponseDTO } from 'src/common/dto/RoomResponse.dto';

export class CreateRoomResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => RoomResponseDTO)
  data: RoomResponseDTO;
}
