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

import { CheckPermission } from 'src/common/decorators/metadata.decorator';
import { ExceptionResponse } from 'src/common/dto/ExceptionResponse.dto';
import { RoomGuard } from 'src/common/guards/room.guard';
import { GetTaskTypesResponseDTO } from 'src/modules/apis/task-type/dto/get-task-types/GetTaskTypesResponse.dto';
import { ModifyTaskTypeBodyDTO } from 'src/modules/apis/task-type/dto/modify-task-type/ModifyTaskTypeBody.dto';
import { ModifyTaskTypeResponseDTO } from 'src/modules/apis/task-type/dto/modify-task-type/ModifyTaskTypeResponse.dto';
import { TaskTypeService } from 'src/modules/apis/task-type/task-type.service';
import { GetTaskTypePermissionHandler } from 'src/modules/permission-handler/task-type/handlers/GetTaskTypePermissionHandler';
import { ModifyTaskTypePermissionHandler } from 'src/modules/permission-handler/task-type/handlers/ModifyTaskTypePermissionHandler';

@ApiTags('Task Type')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ExceptionResponse })
@Controller('rooms/:roomId/task-type')
@UseGuards(RoomGuard)
export class TaskTypeController {
  constructor(private taskTypeService: TaskTypeService) {}

  @Get()
  @CheckPermission(GetTaskTypePermissionHandler)
  async getTaskTypes(
    @Param('roomId') roomId: string
  ): Promise<GetTaskTypesResponseDTO> {
    const response = await this.taskTypeService.getTaskTypes(roomId);
    return plainToInstance(GetTaskTypesResponseDTO, response);
  }

  @Post('create')
  @CheckPermission(ModifyTaskTypePermissionHandler)
  async createTaskType(
    @Param('roomId') roomId: string,
    @Body() body: ModifyTaskTypeBodyDTO
  ): Promise<ModifyTaskTypeResponseDTO> {
    const response = await this.taskTypeService.createTaskType(roomId, body);
    return plainToInstance(ModifyTaskTypeResponseDTO, response);
  }

  @Put(':taskTypeId')
  @CheckPermission(ModifyTaskTypePermissionHandler)
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
  @CheckPermission(ModifyTaskTypePermissionHandler)
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
