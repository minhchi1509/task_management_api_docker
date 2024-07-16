import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { ETaskTypeActions } from 'src/common/constants/enum';
import { IPolicyHandler } from 'src/common/types/policy.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class GetTaskTypePolicyHandler implements IPolicyHandler<TRoomAbility> {
  constructor(private prismaService: PrismaService) {}
  handle = async (userAbility: TRoomAbility, request: Request) => {
    return userAbility.can(ETaskTypeActions.READ, 'TaskType');
  };
}
