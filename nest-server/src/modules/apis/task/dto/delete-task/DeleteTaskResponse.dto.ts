import { Expose, Type } from 'class-transformer';

import { TaskResponseDTO } from 'src/common/dto/TaskResponse.dto';

export class DeleteTaskResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => TaskResponseDTO)
  deletedTask: TaskResponseDTO;
}
