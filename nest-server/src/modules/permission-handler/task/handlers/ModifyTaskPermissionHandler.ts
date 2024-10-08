import { Injectable } from '@nestjs/common';

import { ETaskActions } from 'src/common/constants/room-actions.enum';
import { IPermissionHandler } from 'src/common/types/common.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';

@Injectable()
export class ModifyTaskPermissionHandler
  implements IPermissionHandler<TRoomAbility>
{
  handle = async (userAbility: TRoomAbility) => {
    return (
      userAbility.can(ETaskActions.CREATE, 'Task') ||
      userAbility.can(ETaskActions.UPDATE, 'Task') ||
      userAbility.can(ETaskActions.DELETE, 'Task')
    );
  };
}
