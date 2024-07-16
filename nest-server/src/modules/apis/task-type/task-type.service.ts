import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { GetTaskTypesResponseDTO } from 'src/modules/apis/task-type/dto/get-task-types/GetTaskTypesResponse.dto';
import { ModifyTaskTypeBodyDTO } from 'src/modules/apis/task-type/dto/modify-task-type/ModifyTaskTypeBody.dto';
import { ModifyTaskTypeResponseDTO } from 'src/modules/apis/task-type/dto/modify-task-type/ModifyTaskTypeResponse.dto';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class TaskTypeService {
  constructor(private prismaService: PrismaService) {}

  getTaskTypes = async (roomId: string): Promise<GetTaskTypesResponseDTO> => {
    const room = await this.prismaService.room
      .findUniqueOrThrow({
        where: { id: roomId },
        include: { taskTypes: true }
      })
      .catch(() => {
        throw new NotFoundException('Room not found');
      });

    const responseData: GetTaskTypesResponseDTO = {
      room,
      taskTypes: room.taskTypes
    };
    return responseData;
  };

  createTaskType = async (
    roomId: string,
    taskTypeData: ModifyTaskTypeBodyDTO
  ): Promise<ModifyTaskTypeResponseDTO> => {
    const isTaskTypeNameExist = !!(await this.prismaService.taskType.findFirst({
      where: { name: taskTypeData.name, roomId }
    }));
    if (isTaskTypeNameExist) {
      throw new BadRequestException('Name of task type already exists');
    }

    const createdTaskType = await this.prismaService.taskType.create({
      data: { name: taskTypeData.name, roomId }
    });

    const responseData: ModifyTaskTypeResponseDTO = {
      message: 'Create task type successfully',
      taskType: createdTaskType
    };
    return responseData;
  };

  editTaskType = async (
    roomId: string,
    taskTypeId: string,
    taskTypeData: ModifyTaskTypeBodyDTO
  ): Promise<ModifyTaskTypeResponseDTO> => {
    await this.checkTaskTypeExtistenceInRoom(roomId, taskTypeId);

    const updatedTaskType = await this.prismaService.taskType.update({
      where: { id: taskTypeId },
      data: { name: taskTypeData.name }
    });

    const responseData: ModifyTaskTypeResponseDTO = {
      message: 'Update task type successfully',
      taskType: updatedTaskType
    };
    return responseData;
  };

  deleteTaskType = async (
    roomId: string,
    taskTypeId: string
  ): Promise<ModifyTaskTypeResponseDTO> => {
    await this.checkTaskTypeExtistenceInRoom(roomId, taskTypeId);

    const deletedTaskType = await this.prismaService.taskType.delete({
      where: { id: taskTypeId }
    });

    const responseData: ModifyTaskTypeResponseDTO = {
      message: 'Delete task type successfully',
      taskType: deletedTaskType
    };
    return responseData;
  };

  checkTaskTypeExtistenceInRoom = async (
    roomId: string,
    taskTypeId: string
  ): Promise<void> => {
    const taskType = await this.prismaService.taskType
      .findFirstOrThrow({
        where: { id: taskTypeId, roomId }
      })
      .catch(() => {
        throw new NotFoundException('Task type not found in room');
      });
  };
}
