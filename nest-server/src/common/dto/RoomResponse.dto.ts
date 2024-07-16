import { Expose } from 'class-transformer';

export class RoomResponseDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string | null;
}
