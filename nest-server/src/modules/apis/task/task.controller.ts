import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CheckPermission } from 'src/common/decorators/metadata.decorator';
import { UserId } from 'src/common/decorators/user.decorator';
import { ExceptionResponse } from 'src/common/dto/ExceptionResponse.dto';
import { RoomGuard } from 'src/common/guards/room.guard';
import { CreateTaskResponseDTO } from 'src/modules/apis/task/dto/create-task/CreateTaskResponse.dto';
import { CreateTaskBodyDTO } from 'src/modules/apis/task/dto/create-task/CreatTaskBody.dto';
import { DeleteTaskResponseDTO } from 'src/modules/apis/task/dto/delete-task/DeleteTaskResponse.dto';
import { GetAssignedTasksQueryDTO } from 'src/modules/apis/task/dto/get-assigned-tasks/GetAssignedTasksQuery.dto';
import { GetAssignedTasksResponseDTO } from 'src/modules/apis/task/dto/get-assigned-tasks/GetAssignedTasksResponse.dto';
import { GetDetailTaskResponseDTO } from 'src/modules/apis/task/dto/get-detail-task/GetDetailTaskResponse.dto';
import { GetTasksInRoomResponseDTO } from 'src/modules/apis/task/dto/get-tasks-in-room/GetTaskInRoomResponse.dto';
import { GetTasksInRoomQueryDTO } from 'src/modules/apis/task/dto/get-tasks-in-room/GetTasksInRoomQuery.dto';
import { UpdateSubtaskStatusBodyDTO } from 'src/modules/apis/task/dto/update-subtask-status/UpdateSubtaskStatusBody.dto';
import { UpdateSubtaskStatusResponseDTO } from 'src/modules/apis/task/dto/update-subtask-status/UpdateSubtaskStatusResponse.dto';
import { UpdateTaskBodyDTO } from 'src/modules/apis/task/dto/update-task/UpdateTaskBody.dto';
import { UpdateTaskResponseDTO } from 'src/modules/apis/task/dto/update-task/UpdateTaskResponse.dto';
import { TaskService } from 'src/modules/apis/task/task.service';
import { GetTaskPermissionHandler } from 'src/modules/permission-handler/task/handlers/GetTaskPermissionHandler';
import { ModifyTaskPermissionHandler } from 'src/modules/permission-handler/task/handlers/ModifyTaskPermissionHandler';
import { UpdateSubTaskPermissionHandler } from 'src/modules/permission-handler/task/handlers/UpdateSubTaskPermissionHandler';

@ApiTags('Task')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ExceptionResponse })
@Controller('rooms/:roomId/tasks')
@UseGuards(RoomGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  @CheckPermission(ModifyTaskPermissionHandler)
  async createTask(
    @Body() body: CreateTaskBodyDTO,
    @Param('roomId') roomId: string
  ): Promise<CreateTaskResponseDTO> {
    const responseData = await this.taskService.createTask(roomId, body);
    return plainToInstance(CreateTaskResponseDTO, responseData);
  }

  @Get()
  @CheckPermission(GetTaskPermissionHandler)
  async getTasksInRoom(
    @Param('roomId') roomId: string,
    @Query() query: GetTasksInRoomQueryDTO
  ): Promise<GetTasksInRoomResponseDTO> {
    const responseData = await this.taskService.getTasksInRoom(roomId, query);
    return plainToInstance(GetTasksInRoomResponseDTO, responseData);
  }

  @Get('assigned')
  @CheckPermission(GetTaskPermissionHandler)
  async getAssignedTasksInRoom(
    @Param('roomId') roomId: string,
    @Query() query: GetAssignedTasksQueryDTO,
    @UserId() userId: string
  ): Promise<GetAssignedTasksResponseDTO> {
    const responseData = await this.taskService.getAssignedTasksInRoom(
      roomId,
      userId,
      query
    );
    return plainToInstance(GetAssignedTasksResponseDTO, responseData);
  }

  @Get(':taskId')
  @CheckPermission(GetTaskPermissionHandler)
  async getTaskById(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string
  ): Promise<GetDetailTaskResponseDTO> {
    const responseData = await this.taskService.getTaskById(roomId, taskId);
    return plainToInstance(GetDetailTaskResponseDTO, responseData);
  }

  @Put(':taskId')
  @CheckPermission(ModifyTaskPermissionHandler)
  async updateTask(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string,
    @Body() body: UpdateTaskBodyDTO
  ): Promise<UpdateTaskResponseDTO> {
    const responseData = await this.taskService.updateTask(
      roomId,
      taskId,
      body
    );
    return plainToInstance(UpdateTaskResponseDTO, responseData);
  }

  @Delete(':taskId')
  @CheckPermission(ModifyTaskPermissionHandler)
  async deleteTask(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string
  ): Promise<DeleteTaskResponseDTO> {
    const responseData = await this.taskService.deleteTask(roomId, taskId);
    return plainToInstance(DeleteTaskResponseDTO, responseData);
  }

  @Put(':taskId/sub-tasks/:subTaskId/status')
  @CheckPermission(UpdateSubTaskPermissionHandler)
  async updateSubTaskStatus(
    @Param('roomId') roomId: string,
    @Param('taskId') taskId: string,
    @Param('subTaskId') subTaskId: string,
    @Body() body: UpdateSubtaskStatusBodyDTO
  ): Promise<UpdateSubtaskStatusResponseDTO> {
    const responseData = await this.taskService.updateSubTaskStatus(
      roomId,
      taskId,
      subTaskId,
      body
    );
    return plainToInstance(UpdateSubtaskStatusResponseDTO, responseData);
  }
}
