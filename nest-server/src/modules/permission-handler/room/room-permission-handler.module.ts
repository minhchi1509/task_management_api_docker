import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/libs/prisma/prisma.module';
import { GetRoomMemberPermissionHandler } from 'src/modules/permission-handler/room/handlers/GetRoomMemberPermissionHandler';

@Module({
  imports: [PrismaModule],
  providers: [GetRoomMemberPermissionHandler],
  exports: [GetRoomMemberPermissionHandler]
})
export class RoomPermissionHandlerModule {}
