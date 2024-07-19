import { Module } from '@nestjs/common';

import { GetRoomMemberPermissionHandler } from 'src/modules/permission-handler/room/handlers/GetRoomMemberPermissionHandler';

@Module({
  providers: [GetRoomMemberPermissionHandler],
  exports: [GetRoomMemberPermissionHandler]
})
export class RoomPermissionHandlerModule {}
