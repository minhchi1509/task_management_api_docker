import { Expose, Type } from 'class-transformer';

import { SubTaskResponseDTO } from 'src/common/dto/SubTaskResponse.dto';

export class UpdateSubtaskStatusResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => SubTaskResponseDTO)
  updatedSubTask: SubTaskResponseDTO;
}
