import { subject } from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

import { ERoomActions } from 'src/common/constants/enum';
import { IPolicyHandler } from 'src/common/types/policy.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class GetRoomMemberPolicyHandler
  implements IPolicyHandler<TRoomAbility>
{
  constructor(private prismaService: PrismaService) {}

  handle = async (userAbility: TRoomAbility, request: Request) => {
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
