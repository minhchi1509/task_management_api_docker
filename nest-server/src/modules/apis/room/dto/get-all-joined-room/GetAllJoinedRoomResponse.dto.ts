import { ApiProperty } from '@nestjs/swagger';
import { RoomRole } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

import { RoomResponseDTO } from 'src/common/dto/RoomResponse.dto';
import { UserResponseDTO } from 'src/common/dto/UserResponse.dto';

export class JoinedRoomResponse {
  @ApiProperty({ enum: RoomRole })
  @Expose()
  role: RoomRole;

  @Expose()
  @Type(() => RoomResponseDTO)
  room: RoomResponseDTO;
}

export class GetAllJoinedRoomResponseDTO {
  @Expose()
  @Type(() => UserResponseDTO)
  profile: UserResponseDTO;

  @Expose()
  @Type(() => JoinedRoomResponse)
  joinedRooms: JoinedRoomResponse[];
}
