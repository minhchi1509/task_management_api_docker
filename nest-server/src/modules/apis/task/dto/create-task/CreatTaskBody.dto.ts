import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested
} from 'class-validator';

import { IsAfterDateTime } from 'src/common/decorators/class-validator/IsAfterDateTime.validator';
import { Trim } from 'src/common/decorators/sanitizer/trim.sanitizer';

export class CreateSubTaskBodyDTO {
  @Trim()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreateTaskBodyDTO {
  @Trim()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Trim()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: TaskPriority })
  @Trim()
  @IsNotEmpty()
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @Trim()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @Trim()
  @IsNotEmpty()
  @IsDateString()
  @IsAfterDateTime({ relatedProperty: 'startDate' })
  dueDate: Date;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  @Transform(({ value }) => Array.from(new Set(value)))
  performersUserId: string[];

  @IsNotEmpty()
  @IsUUID()
  taskTypeId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateSubTaskBodyDTO)
  subTasks: CreateSubTaskBodyDTO[];
}
