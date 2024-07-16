import { Expose, Type } from 'class-transformer';

import { TaskResponseDTO } from 'src/common/dto/TaskResponse.dto';

export class CreateTaskResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => TaskResponseDTO)
  createdTask: TaskResponseDTO;
}
