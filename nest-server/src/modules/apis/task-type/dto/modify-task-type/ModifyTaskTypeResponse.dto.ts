import { Expose, Type } from 'class-transformer';

import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';
import { TaskTypeResponseDTO } from 'src/common/dto/TaskTypeResponse.dto';

export class ModifyTaskTypeResponseDTO extends MessageResponseDTO {
  @Expose()
  @Type(() => TaskTypeResponseDTO)
  taskType: TaskTypeResponseDTO;
}
