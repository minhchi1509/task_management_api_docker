import { subject } from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

import { ETaskCommentActions } from 'src/common/constants/enum';
import { IPolicyHandler } from 'src/common/types/policy.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class GetTaskCommentsPolicyHandler
  implements IPolicyHandler<TRoomAbility>
{
  constructor(private prismaService: PrismaService) {}

  handle = async (userAbility: TRoomAbility, request: Request) => {
    const roomId = request.params.roomId;
    const taskId = request.params.taskId;
    const task = await this.prismaService.task
      .findFirstOrThrow({
        where: { id: taskId, roomId },
        include: { performers: true }
      })
      .catch(() => {
        throw new NotFoundException('Task not found');
      });

    return userAbility.can(ETaskCommentActions.READ, subject('Task', task));
  };
}
