import { Expose, Type } from 'class-transformer';

import { TaskResponseDTO } from 'src/common/dto/TaskResponse.dto';

export class UpdateTaskResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => TaskResponseDTO)
  updatedTask: TaskResponseDTO;
}
