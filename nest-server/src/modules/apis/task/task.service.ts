import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import dayjs from 'dayjs';

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
import { TaskTypeService } from 'src/modules/apis/task-type/task-type.service';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(
    private prismaService: PrismaService,
    private taskTypeService: TaskTypeService
  ) {}

  createTask = async (
    roomId: string,
    taskData: CreateTaskBodyDTO
  ): Promise<CreateTaskResponseDTO> => {
    await this.checkPerformersExistanceInRoom(
      taskData.performersUserId,
      roomId
    );
    await this.taskTypeService.checkTaskTypeExtistenceInRoom(
      roomId,
      taskData.taskTypeId
    );

    const {
      title,
      description,
      dueDate,
      performersUserId,
      priority,
      score,
      startDate,
      subTasks,
      taskTypeId
    } = taskData;

    const performerRoomMembers = await this.prismaService.roomMember.findMany({
      where: { roomId, userId: { in: performersUserId } },
      select: { id: true, user: { select: { id: true } } }
    });

    const createdTask = await this.prismaService.task.create({
      data: {
        title,
        description,
        dueDate,
        priority,
        score,
        startDate,
        room: { connect: { id: roomId } },
        taskType: { connect: { id: taskTypeId } },
        subTasks: {
          createMany: { data: subTasks }
        },
        performers: {
          connect: performerRoomMembers.map(({ id }) => ({ id }))
        }
      },
      include: {
        subTasks: true,
        performers: { include: { user: true } },
        taskType: true
      }
    });

    const responseData: CreateTaskResponseDTO = {
      message: 'Create task successfully',
      createdTask: {
        ...createdTask,
        performers: createdTask.performers.map((performer) => ({
          ...performer,
          profile: performer.user
        }))
      }
    };
    return responseData;
  };

  async getTasksInRoom(
    roomId: string,
    query: GetTasksInRoomQueryDTO
  ): Promise<GetTasksInRoomResponseDTO> {
    const { title, taskType, priority, performerName, status } = query;

    const tasks = await this.prismaService.task.findMany({
      where: {
        roomId,
        ...(title && { title: { contains: title } }),
        ...(status && { status: { in: status } }),
        ...(taskType && { taskType: { name: { contains: taskType } } }),
        ...(priority && { priority: { in: priority } }),
        ...(performerName && {
          performers: {
            some: { user: { fullName: { contains: performerName } } }
          }
        })
      },
      include: {
        subTasks: true,
        performers: { include: { user: true } },
        taskType: true
      }
    });

    const responseData: GetTasksInRoomResponseDTO = {
      totalTasks: tasks.length,
      tasks: tasks.map((task) => ({
        ...task,
        performers: task.performers.map((performer) => ({
          ...performer,
          profile: performer.user
        }))
      }))
    };
    return responseData;
  }

  getAssignedTasksInRoom = async (
    roomId: string,
    userId: string,
    query: GetAssignedTasksQueryDTO
  ): Promise<GetAssignedTasksResponseDTO> => {
    const { title, taskType, priority, status } = query;

    const userProfile = await this.prismaService.user
      .findUniqueOrThrow({
        where: { id: userId }
      })
      .catch(() => {
        throw new NotFoundException('User does not exist');
      });

    const tasks = await this.prismaService.task.findMany({
      where: {
        roomId,
        performers: { some: { userId } },
        ...(status && { status: { in: status } }),
        ...(title && { title: { contains: title } }),
        ...(taskType && { taskType: { name: { contains: taskType } } }),
        ...(priority && { priority: { in: priority } })
      },
      include: {
        subTasks: true,
        performers: { include: { user: true } },
        taskType: true
      }
    });

    const responseData: GetAssignedTasksResponseDTO = {
      totalAssignedTasks: tasks.length,
      profile: userProfile,
      assignedTasks: tasks.map((task) => ({
        ...task,
        performers: task.performers.map((performer) => ({
          ...performer,
          profile: performer.user
        }))
      }))
    };
    return responseData;
  };

  getTaskById = async (
    roomId: string,
    taskId: string
  ): Promise<GetDetailTaskResponseDTO> => {
    const detailTask = await this.prismaService.task
      .findFirstOrThrow({
        where: { id: taskId, roomId },
        include: {
          room: true,
          performers: { include: { user: true } },
          taskType: true,
          subTasks: true
        }
      })
      .catch(() => {
        throw new NotFoundException('Task not found in room');
      });

    const responseData: GetDetailTaskResponseDTO = {
      room: detailTask.room,
      task: {
        ...detailTask,
        performers: detailTask.performers.map((performer) => ({
          ...performer,
          profile: performer.user
        }))
      }
    };
    return responseData;
  };

  updateTask = async (
    roomId: string,
    taskId: string,
    taskData: UpdateTaskBodyDTO
  ): Promise<UpdateTaskResponseDTO> => {
    const currentTask = await this.prismaService.task
      .findFirstOrThrow({
        where: { id: taskId, roomId },
        select: { startDate: true, dueDate: true }
      })
      .catch(() => {
        throw new NotFoundException('Task not found in room');
      });

    const {
      title,
      description,
      dueDate,
      priority,
      score,
      startDate,
      subTasks,
      taskTypeId,
      performersUserId
    } = taskData;

    if (taskTypeId) {
      await this.taskTypeService.checkTaskTypeExtistenceInRoom(
        roomId,
        taskTypeId
      );
    }

    if (performersUserId) {
      await this.checkPerformersExistanceInRoom(performersUserId, roomId);
    }
    if (startDate && dueDate) {
      if (dayjs(dueDate).isBefore(dayjs(startDate))) {
        throw new BadRequestException('Due date must be after start date');
      }
    } else if (startDate && !dueDate) {
      if (dayjs(startDate).isAfter(dayjs(currentTask.dueDate))) {
        throw new BadRequestException('Start date must be before due date');
      }
    } else if (!startDate && dueDate) {
      if (dayjs(currentTask.startDate).isAfter(dayjs(dueDate))) {
        throw new BadRequestException('Start date must be before due date');
      }
    }

    if (subTasks) {
      const deletedSubTasks = await this.prismaService.subTask.deleteMany({
        where: {
          taskId: taskId
        }
      });
    }

    const updatedTask = await this.prismaService.task.update({
      where: { id: taskId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(dueDate && { dueDate }),
        ...(priority && { priority }),
        ...(score && { score }),
        ...(startDate && { startDate }),
        ...(taskTypeId && { taskType: { connect: { id: taskTypeId } } }),
        ...(subTasks && {
          subTasks: {
            createMany: { data: subTasks }
          }
        })
      },
      include: {
        subTasks: true,
        performers: { include: { user: true } },
        taskType: true
      }
    });

    const responseData: UpdateTaskResponseDTO = {
      message: 'Update task successfully',
      updatedTask: {
        ...updatedTask,
        performers: updatedTask.performers.map((performer) => ({
          ...performer,
          profile: performer.user
        }))
      }
    };
    return responseData;
  };

  deleteTask = async (
    roomId: string,
    taskId: string
  ): Promise<DeleteTaskResponseDTO> => {
    await this.checkTaskExistanceInRoom(roomId, taskId);

    const deletedTask = await this.prismaService.task.delete({
      where: { id: taskId },
      include: {
        subTasks: true,
        performers: { include: { user: true } },
        taskType: true
      }
    });

    const responseData: DeleteTaskResponseDTO = {
      message: 'Delete task successfully',
      deletedTask: {
        ...deletedTask,
        performers: deletedTask.performers.map((performer) => ({
          ...performer,
          profile: performer.user
        }))
      }
    };
    return responseData;
  };

  updateSubTaskStatus = async (
    roomId: string,
    taskId: string,
    subTaskId: string,
    subtaskData: UpdateSubtaskStatusBodyDTO
  ): Promise<UpdateSubtaskStatusResponseDTO> => {
    const currentSubTask = await this.prismaService.subTask
      .findFirstOrThrow({
        where: {
          id: subTaskId,
          task: { id: taskId, roomId }
        },
        select: { state: true }
      })
      .catch(() => {
        throw new NotFoundException('Subtask not found in task');
      });

    const { status } = subtaskData;
    if (status === currentSubTask.state) {
      throw new BadRequestException('Subtask status is already the same');
    }

    const updatedSubTask = await this.prismaService.subTask.update({
      where: { id: subTaskId },
      data: { state: status }
    });

    const task = await this.prismaService.task
      .findUniqueOrThrow({
        where: { id: taskId },
        include: { subTasks: true }
      })
      .catch(() => {
        throw new NotFoundException('Task not found');
      });

    const isAllSubTasksDone = task.subTasks.every(
      (subTask) => subTask.state === 'DONE'
    );

    if (isAllSubTasksDone) {
      await this.updateTaskStatus(taskId, 'DONE');
    } else {
      await this.updateTaskStatus(taskId, 'IN_PROGRESS');
    }

    const responseData: UpdateSubtaskStatusResponseDTO = {
      message: 'Update subtask status successfully',
      updatedSubTask
    };
    return responseData;
  };

  updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    const task = await this.prismaService.task
      .findUniqueOrThrow({
        where: { id: taskId },
        select: { status: true }
      })
      .catch(() => {
        throw new NotFoundException('Task not found');
      });

    if (task.status === status) {
      return;
    }
    const updatedTask = await this.prismaService.task.update({
      where: { id: taskId },
      data: { status },

      select: {
        performers: { select: { id: true } },
        score: true
      }
    });

    const roomMembersIds = updatedTask.performers.map(
      (performer) => performer.id
    );

    if (status === 'DONE' || status === 'IN_PROGRESS') {
      const updateMembersScore = await this.prismaService.roomMember.updateMany(
        {
          where: { id: { in: roomMembersIds } },
          data: {
            accumulatedScore: {
              [status === 'DONE' ? 'increment' : 'decrement']: updatedTask.score
            }
          }
        }
      );
    }

    return updatedTask;
  };

  checkPerformersExistanceInRoom = async (
    performersUserId: string[],
    roomId: string
  ): Promise<void> => {
    const performersUser = await this.prismaService.roomMember.findMany({
      where: {
        roomId,
        userId: {
          in: performersUserId
        }
      }
    });
    if (performersUser.length !== performersUserId.length) {
      throw new BadRequestException('Some performers do not exist in the room');
    }
  };

  checkTaskExistanceInRoom = async (
    roomId: string,
    taskId: string
  ): Promise<void> => {
    const task = this.prismaService.task
      .findFirstOrThrow({
        where: { id: taskId, roomId }
      })
      .catch(() => {
        throw new NotFoundException('Task not found in room');
      });
  };
}
