import { Expose, Type } from 'class-transformer';

import { AwardResponseDTO } from 'src/common/dto/AwardResponse.dto';

export class DeleteAwardResponseDTO {
  @Expose()
  message: string;

  @Expose()
  @Type(() => AwardResponseDTO)
  deletedAward: AwardResponseDTO;
}
