import { Module } from '@nestjs/common';

import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { ROOM_ID_LENGTH } from 'src/common/constants/variables';
import { PrismaModule } from 'src/modules/libs/prisma/prisma.module';
import { ShortUniqueIdModule } from 'src/modules/libs/short-id/short-id.module';
import { RoomPermissionHandlerModule } from 'src/modules/permission-handler/room/room-permission-handler.module';

@Module({
  imports: [
    PrismaModule,
    RoomPermissionHandlerModule,
    ShortUniqueIdModule.register({ length: ROOM_ID_LENGTH })
  ],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
