import { Module } from '@nestjs/common';

import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { ROOM_ID_LENGTH } from 'src/common/constants/variables';
import { ShortUniqueIdModule } from 'src/modules/libs/short-id/short-id.module';
import { AppPolicyModule } from 'src/modules/policy/app-policy.module';
import { RoomPolicyHandlerModule } from 'src/modules/policy-handler/room/room-policy-handler.module';

@Module({
  imports: [
    AppPolicyModule,
    RoomPolicyHandlerModule,
    ShortUniqueIdModule.register({ length: ROOM_ID_LENGTH })
  ],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
