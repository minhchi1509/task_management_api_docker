import { Expose, Type } from 'class-transformer';

import { UserResponseDTO } from 'src/common/dto/UserResponse.dto';

export class ResetPasswordResponseDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => UserResponseDTO)
  user: UserResponseDTO;
}
