import { Expose, Type } from 'class-transformer';

import { TaskResponseDTO } from 'src/common/dto/TaskResponse.dto';
import { UserResponseDTO } from 'src/common/dto/UserResponse.dto';

export class GetAssignedTasksResponseDTO {
  @Expose()
  @Type(() => UserResponseDTO)
  profile: UserResponseDTO;

  @Expose()
  totalAssignedTasks: number;

  @Expose()
  @Type(() => TaskResponseDTO)
  assignedTasks: TaskResponseDTO[];
}
