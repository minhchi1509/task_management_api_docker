import { Expose } from 'class-transformer';

export class SendResetPasswordMailResponseDto {
  @Expose()
  message: string;
}
