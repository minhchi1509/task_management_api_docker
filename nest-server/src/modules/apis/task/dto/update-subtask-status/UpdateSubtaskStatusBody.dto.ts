import { ApiProperty } from '@nestjs/swagger';
import { SubTaskState } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateSubtaskStatusBodyDTO {
  @ApiProperty({ enum: SubTaskState })
  @IsNotEmpty()
  @IsEnum(SubTaskState)
  status: SubTaskState;
}
