import { Expose, Type } from 'class-transformer';

import { TaskResponseDTO } from 'src/common/dto/TaskResponse.dto';

export class GetTasksInRoomResponseDTO {
  @Expose()
  totalTasks: number;

  @Expose()
  @Type(() => TaskResponseDTO)
  tasks: TaskResponseDTO[];
}
