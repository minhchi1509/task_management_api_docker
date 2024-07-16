import { Expose, Type } from 'class-transformer';

import { RoomResponseDTO } from 'src/common/dto/RoomResponse.dto';
import { TaskTypeResponseDTO } from 'src/common/dto/TaskTypeResponse.dto';

export class GetTaskTypesResponseDTO {
  @Expose()
  @Type(() => RoomResponseDTO)
  room: RoomResponseDTO;

  @Expose()
  @Type(() => TaskTypeResponseDTO)
  taskTypes: TaskTypeResponseDTO[];
}
