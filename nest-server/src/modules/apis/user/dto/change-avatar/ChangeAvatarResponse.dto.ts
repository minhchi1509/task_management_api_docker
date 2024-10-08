import { Expose } from 'class-transformer';

export class ChangeAvatarResponseDTO {
  @Expose()
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  avatar: string;
}
