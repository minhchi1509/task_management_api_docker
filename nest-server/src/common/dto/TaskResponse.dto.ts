import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

import { RoomMemberResponseDTO } from 'src/common/dto/RoomMemberResponse.dto';
import { SubTaskResponseDTO } from 'src/common/dto/SubTaskResponse.dto';
import { TaskTypeResponseDTO } from 'src/common/dto/TaskTypeResponse.dto';

export class TaskResponseDTO {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @ApiProperty({ enum: TaskPriority })
  @Expose()
  priority: TaskPriority;

  @ApiProperty({ enum: TaskStatus })
  @Expose()
  status: TaskStatus;

  @Expose()
  startDate: Date;

  @Expose()
  dueDate: Date;

  @Expose()
  score: number;

  @Expose()
  @Type(() => RoomMemberResponseDTO)
  performers: RoomMemberResponseDTO[];

  @Expose()
  @Type(() => SubTaskResponseDTO)
  subTasks: SubTaskResponseDTO[];

  @Expose()
  @Type(() => TaskTypeResponseDTO)
  taskType: TaskTypeResponseDTO;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
