import { Module } from '@nestjs/common';

import { GetRoomMemberPolicyHandler } from 'src/modules/policy-handler/room/handlers/GetRoomMemberPolicyHandler';

@Module({
  providers: [GetRoomMemberPolicyHandler],
  exports: [GetRoomMemberPolicyHandler]
})
export class RoomPolicyHandlerModule {}
