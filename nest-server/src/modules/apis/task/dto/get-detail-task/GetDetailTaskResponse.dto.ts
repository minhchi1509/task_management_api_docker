import { Expose, Type } from 'class-transformer';

import { RoomResponseDTO } from 'src/common/dto/RoomResponse.dto';
import { TaskResponseDTO } from 'src/common/dto/TaskResponse.dto';

export class GetDetailTaskResponseDTO {
  @Expose()
  @Type(() => RoomResponseDTO)
  room!: RoomResponseDTO;

  @Expose()
  @Type(() => TaskResponseDTO)
  task!: TaskResponseDTO;
}
