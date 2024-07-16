import { Expose } from 'class-transformer';

export class AwardResponseDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  minScore: number;
}
