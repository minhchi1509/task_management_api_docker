import { subject } from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ETaskCommentActions } from 'src/common/constants/room-actions.enum';
import { IPermissionHandler, IRequest } from 'src/common/types/common.type';
import { ICommentRequestParams } from 'src/common/types/request-params.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class GetTaskCommentsPermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  constructor(private prismaService: PrismaService) {}

  handle = async (
    userAbility: TRoomAbility,
    request: IRequest<any, ICommentRequestParams>
  ) => {
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
