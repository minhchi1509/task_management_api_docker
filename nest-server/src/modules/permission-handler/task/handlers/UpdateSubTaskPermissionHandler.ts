import { subject } from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

import { ESubTaskActions } from 'src/common/constants/enum';
import { IPermissionHandler } from 'src/common/types/permission.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class UpdateSubTaskPermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  constructor(private prismaService: PrismaService) {}

  handle = async (userAbility: TRoomAbility, request: Request) => {
    const subTaskId = request.params.subTaskId;
    const taskId = request.params.taskId;
    const roomId = request.params.roomId;
    const subTask = await this.prismaService.subTask
      .findFirstOrThrow({
        where: {
          id: subTaskId,
          task: { id: taskId, roomId }
        },
        include: {
          task: {
            select: { performers: true }
          }
        }
      })
      .catch(() => {
        throw new NotFoundException('Sub task not found');
      });

    return userAbility.can(
      ESubTaskActions.UPDATE_STATUS,
      subject('SubTask', subTask)
    );
  };
}
