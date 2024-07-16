import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
  ValidateNested
} from 'class-validator';

import { CreateSubTaskBodyDTO } from 'src/modules/apis/task/dto/create-task/CreatTaskBody.dto';

export class UpdateTaskBodyDTO {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @ApiProperty({ enum: TaskPriority })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsUUID()
  taskTypeId?: string;

  @IsOptional()
  @ValidateIf((o) => o.performers)
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  @Transform(({ value }) => Array.from(new Set(value)))
  performersUserId?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateSubTaskBodyDTO)
  subTasks?: CreateSubTaskBodyDTO[];
}
