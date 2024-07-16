import { Expose } from 'class-transformer';

export class UserResponseDTO {
  @Expose()
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;
}
