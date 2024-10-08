import { Expose, Type } from 'class-transformer';

import { AwardResponseDTO } from 'src/common/dto/AwardResponse.dto';
import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';

export class DeleteAwardResponseDTO extends MessageResponseDTO {
  @Expose()
  @Type(() => AwardResponseDTO)
  deletedAward: AwardResponseDTO;
}
