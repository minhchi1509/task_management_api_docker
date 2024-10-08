import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { ETaskTypeActions } from 'src/common/constants/room-actions.enum';
import { IPermissionHandler } from 'src/common/types/common.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';

@Injectable()
export class GetTaskTypePermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  handle = async (userAbility: TRoomAbility, request: Request) => {
    return userAbility.can(ETaskTypeActions.READ, 'TaskType');
  };
}
