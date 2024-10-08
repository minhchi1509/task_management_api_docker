import { subject } from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ETaskCommentActions } from 'src/common/constants/room-actions.enum';
import { IPermissionHandler, IRequest } from 'src/common/types/common.type';
import { ICommentRequestParams } from 'src/common/types/request-params.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class UpdateCommentPermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  constructor(private prismaService: PrismaService) {}

  handle = async (
    userAbility: TRoomAbility,
    request: IRequest<any, ICommentRequestParams>
  ) => {
    const roomId = request.params.roomId;
    const taskId = request.params.taskId;
    const commentId = request.params.commentId;
    const comment = await this.prismaService.comment
      .findFirstOrThrow({
        where: { id: commentId, task: { id: taskId, roomId } },
        include: { commentator: true }
      })
      .catch(() => {
        throw new NotFoundException('Comment not found');
      });

    return userAbility.can(
      ETaskCommentActions.UPDATE,
      subject('Comment', comment)
    );
  };
}
