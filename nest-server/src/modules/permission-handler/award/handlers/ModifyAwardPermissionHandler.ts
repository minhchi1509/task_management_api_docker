import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { EAwardActions } from 'src/common/constants/actions.enum';
import { IPermissionHandler } from 'src/common/types/permission.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';

@Injectable()
export class ModifyAwardPermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  handle = async (userAbility: TRoomAbility, request: Request) => {
    return (
      userAbility.can(EAwardActions.CREATE, 'Award') ||
      userAbility.can(EAwardActions.UPDATE, 'Award') ||
      userAbility.can(EAwardActions.DELETE, 'Award')
    );
  };
}
