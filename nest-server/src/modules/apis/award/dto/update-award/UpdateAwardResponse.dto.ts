import { Expose, Type } from 'class-transformer';

import { AwardResponseDTO } from 'src/common/dto/AwardResponse.dto';

export class UpdateAwardResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => AwardResponseDTO)
  updatedAward: AwardResponseDTO;
}
