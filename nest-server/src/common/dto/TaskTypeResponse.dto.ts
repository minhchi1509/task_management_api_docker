import { Expose } from 'class-transformer';

export class TaskTypeResponseDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
