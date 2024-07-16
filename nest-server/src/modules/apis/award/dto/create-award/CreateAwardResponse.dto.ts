import { Expose, Type } from 'class-transformer';

import { AwardResponseDTO } from 'src/common/dto/AwardResponse.dto';

export class CreateAwardResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => AwardResponseDTO)
  createdAward: AwardResponseDTO;
}
