import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CheckPolicy } from 'src/common/decorators/metadata.decorator';
import { ExceptionResponse } from 'src/common/dto/ExceptionResponse.dto';
import { RoomPolicyGuard } from 'src/common/guards/room-policy.guard';
import { GetTaskTypesResponseDTO } from 'src/modules/apis/task-type/dto/get-task-types/GetTaskTypesResponse.dto';
import { ModifyTaskTypeBodyDTO } from 'src/modules/apis/task-type/dto/modify-task-type/ModifyTaskTypeBody.dto';
import { ModifyTaskTypeResponseDTO } from 'src/modules/apis/task-type/dto/modify-task-type/ModifyTaskTypeResponse.dto';
import { TaskTypeService } from 'src/modules/apis/task-type/task-type.service';
import { GetTaskTypePolicyHandler } from 'src/modules/policy-handler/task-type/handlers/GetTaskTypePolicyHandler';
import { ModifyTaskTypeHandler } from 'src/modules/policy-handler/task-type/handlers/ModifyTaskTypeHandler';

@ApiTags('Task Type')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ExceptionResponse })
@Controller('rooms/:roomId/task-type')
@UseGuards(RoomPolicyGuard)
export class TaskTypeController {
  constructor(private taskTypeService: TaskTypeService) {}

  @Get()
  @CheckPolicy(GetTaskTypePolicyHandler)
  async getTaskTypes(
    @Param('roomId') roomId: string
  ): Promise<GetTaskTypesResponseDTO> {
    const response = await this.taskTypeService.getTaskTypes(roomId);
    return plainToInstance(GetTaskTypesResponseDTO, response);
  }

  @Post('create')
  @CheckPolicy(ModifyTaskTypeHandler)
  async createTaskType(
    @Param('roomId') roomId: string,
    @Body() body: ModifyTaskTypeBodyDTO
  ): Promise<ModifyTaskTypeResponseDTO> {
    const response = await this.taskTypeService.createTaskType(roomId, body);
    return plainToInstance(ModifyTaskTypeResponseDTO, response);
  }

  @Put(':taskTypeId')
  @CheckPolicy(ModifyTaskTypeHandler)
  async editTaskType(
    @Param('taskTypeId') taskTypeId: string,
    @Param('roomId') roomId: string,
    @Body() body: ModifyTaskTypeBodyDTO
  ): Promise<ModifyTaskTypeResponseDTO> {
    const response = await this.taskTypeService.editTaskType(
      roomId,
      taskTypeId,
      body
    );
    return plainToInstance(ModifyTaskTypeResponseDTO, response);
  }

  @Delete(':taskTypeId')
  @CheckPolicy(ModifyTaskTypeHandler)
  async deleteTaskType(
    @Param('taskTypeId') taskTypeId: string,
    @Param('roomId') roomId: string
  ): Promise<ModifyTaskTypeResponseDTO> {
    const response = await this.taskTypeService.deleteTaskType(
      roomId,
      taskTypeId
    );
    return plainToInstance(ModifyTaskTypeResponseDTO, response);
  }
}
