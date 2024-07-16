import { Expose, Type } from 'class-transformer';

import { TaskTypeResponseDTO } from 'src/common/dto/TaskTypeResponse.dto';

export class ModifyTaskTypeResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => TaskTypeResponseDTO)
  taskType: TaskTypeResponseDTO;
}
