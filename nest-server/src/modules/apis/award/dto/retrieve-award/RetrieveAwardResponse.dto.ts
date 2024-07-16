import { Expose, Type } from 'class-transformer';

import { AwardResponseDTO } from 'src/common/dto/AwardResponse.dto';

export class RetrieveAwardResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => AwardResponseDTO)
  retrievedAward: AwardResponseDTO;
}
