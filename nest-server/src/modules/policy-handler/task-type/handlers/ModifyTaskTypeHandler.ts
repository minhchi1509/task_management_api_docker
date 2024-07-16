import { Injectable } from '@nestjs/common';

import { ETaskTypeActions } from 'src/common/constants/enum';
import { IPolicyHandler } from 'src/common/types/policy.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';

@Injectable()
export class ModifyTaskTypeHandler implements IPolicyHandler<TRoomAbility> {
  handle = async (userAbility: TRoomAbility) => {
    return (
      userAbility.can(ETaskTypeActions.CREATE, 'TaskType') ||
      userAbility.can(ETaskTypeActions.UPDATE, 'TaskType') ||
      userAbility.can(ETaskTypeActions.DELETE, 'TaskType')
    );
  };
}
