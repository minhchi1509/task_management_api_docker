import { Expose, Type } from 'class-transformer';

import { AwardResponseDTO } from 'src/common/dto/AwardResponse.dto';
import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';

export class CreateAwardResponseDTO extends MessageResponseDTO {
  @Expose()
  @Type(() => AwardResponseDTO)
  createdAward: AwardResponseDTO;
}
