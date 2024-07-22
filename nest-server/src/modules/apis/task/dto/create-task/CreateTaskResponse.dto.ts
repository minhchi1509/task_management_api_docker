import { Expose, Type } from 'class-transformer';

import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';
import { TaskResponseDTO } from 'src/common/dto/TaskResponse.dto';

export class CreateTaskResponseDTO extends MessageResponseDTO {
  @Expose()
  @Type(() => TaskResponseDTO)
  createdTask: TaskResponseDTO;
}
