import { ApiProperty } from '@nestjs/swagger';
import { SubTaskState } from '@prisma/client';
import { Expose } from 'class-transformer';

export class SubTaskResponseDTO {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @ApiProperty({ enum: SubTaskState })
  @Expose()
  state: SubTaskState;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
