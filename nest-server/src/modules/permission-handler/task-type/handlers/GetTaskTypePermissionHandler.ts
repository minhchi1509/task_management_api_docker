import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { ETaskTypeActions } from 'src/common/constants/actions.enum';
import { IPermissionHandler } from 'src/common/types/permission.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class GetTaskTypePermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  constructor(private prismaService: PrismaService) {}
  handle = async (userAbility: TRoomAbility, request: Request) => {
    return userAbility.can(ETaskTypeActions.READ, 'TaskType');
  };
}
