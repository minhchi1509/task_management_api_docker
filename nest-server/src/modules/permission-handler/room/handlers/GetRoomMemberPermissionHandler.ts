import { subject } from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ERoomActions } from 'src/common/constants/room-actions.enum';
import { IPermissionHandler, IRequest } from 'src/common/types/common.type';
import { IRoomRequestParams } from 'src/common/types/request-params.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class GetRoomMemberPermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  constructor(private prismaService: PrismaService) {}

  handle = async (
    userAbility: TRoomAbility,
    request: IRequest<any, IRoomRequestParams>
  ) => {
    const roomId = request.params.roomId;
    const room = await this.prismaService.room
      .findUniqueOrThrow({
        where: { id: roomId },
        include: { roomMembers: true }
      })
      .catch(() => {
        throw new NotFoundException('Room not found');
      });
    return userAbility.can(ERoomActions.GET_MEMBER, subject('Room', room));
  };
}
