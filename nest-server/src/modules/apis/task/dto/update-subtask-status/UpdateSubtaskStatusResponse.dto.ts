import { Expose, Type } from 'class-transformer';

import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';
import { SubTaskResponseDTO } from 'src/common/dto/SubTaskResponse.dto';

export class UpdateSubtaskStatusResponseDTO extends MessageResponseDTO {
  @Expose()
  @Type(() => SubTaskResponseDTO)
  updatedSubTask: SubTaskResponseDTO;
}
