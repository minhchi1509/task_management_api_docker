import { subject } from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

import { ETaskCommentActions } from 'src/common/constants/actions.enum';
import { IPermissionHandler } from 'src/common/types/permission.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class DeleteCommentPermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  constructor(private prismaService: PrismaService) {}

  handle = async (userAbility: TRoomAbility, request: Request) => {
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
      ETaskCommentActions.DELETE,
      subject('Comment', comment)
    );
  };
}
