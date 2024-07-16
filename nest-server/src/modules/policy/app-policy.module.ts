import { Module } from '@nestjs/common';

import { RoomAbilityFactory } from 'src/modules/policy/factory/RoomAbilityFactory';

@Module({
  providers: [RoomAbilityFactory],
  exports: [RoomAbilityFactory]
})
export class AppPolicyModule {}
