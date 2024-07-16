import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { EAwardActions } from 'src/common/constants/enum';
import { IPolicyHandler } from 'src/common/types/policy.type';
import { TRoomAbility } from 'src/common/types/room-ability.type';

@Injectable()
export class ModifyAwardPolicyHandler implements IPolicyHandler<TRoomAbility> {
  handle = async (userAbility: TRoomAbility, request: Request) => {
    return (
      userAbility.can(EAwardActions.CREATE, 'Award') ||
      userAbility.can(EAwardActions.UPDATE, 'Award') ||
      userAbility.can(EAwardActions.DELETE, 'Award')
    );
  };
}
