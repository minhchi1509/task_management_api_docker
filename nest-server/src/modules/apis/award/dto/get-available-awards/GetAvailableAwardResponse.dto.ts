import { Expose, Type } from 'class-transformer';

import { AwardResponseDTO } from 'src/common/dto/AwardResponse.dto';
import { RoomMemberResponseDTO } from 'src/common/dto/RoomMemberResponse.dto';

export class GetAvailableAwardResponseDTO {
  @Expose()
  @Type(() => RoomMemberResponseDTO)
  memberInformation: RoomMemberResponseDTO;

  @Expose()
  @Type(() => AwardResponseDTO)
  awards: AwardResponseDTO[];
}
