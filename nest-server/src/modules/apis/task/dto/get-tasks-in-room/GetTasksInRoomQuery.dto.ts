import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';

export class GetTasksInRoomQueryDTO {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @ApiProperty({ enum: TaskPriority, isArray: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  @IsEnum(TaskPriority, { each: true })
  priority?: TaskPriority[];

  @IsOptional()
  @IsString()
  @MinLength(1)
  taskType?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  performerName?: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  @IsEnum(TaskStatus, { each: true })
  status?: TaskStatus[];
}
