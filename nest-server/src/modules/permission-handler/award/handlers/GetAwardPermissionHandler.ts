import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { EAwardActions } from 'src/common/constants/room-actions.enum';
import { IPermissionHandler } from 'src/common/types/common.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';

@Injectable()
export class GetAwardPermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  handle = async (userAbility: TRoomAbility, request: Request) => {
    return userAbility.can(EAwardActions.READ, 'Award');
  };
}
