import { ApiProperty } from '@nestjs/swagger';
import { RoomRole } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

import { UserResponseDTO } from 'src/common/dto/UserResponse.dto';

export class RoomMemberResponseDTO {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserResponseDTO)
  profile: UserResponseDTO;

  @Expose()
  joinedAt: Date;

  @ApiProperty({ enum: RoomRole })
  @Expose()
  role: RoomRole;

  @Expose()
  accumulatedScore: number;
}
