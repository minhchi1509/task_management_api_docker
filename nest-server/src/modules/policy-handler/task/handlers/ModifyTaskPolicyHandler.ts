import { Injectable } from '@nestjs/common';

import { ETaskActions } from 'src/common/constants/enum';
import { IPolicyHandler } from 'src/common/types/policy.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';

@Injectable()
export class ModifyTaskPolicyHandler implements IPolicyHandler<TRoomAbility> {
  handle = async (userAbility: TRoomAbility) => {
    return (
      userAbility.can(ETaskActions.CREATE, 'Task') ||
      userAbility.can(ETaskActions.UPDATE, 'Task') ||
      userAbility.can(ETaskActions.DELETE, 'Task')
    );
  };
}
