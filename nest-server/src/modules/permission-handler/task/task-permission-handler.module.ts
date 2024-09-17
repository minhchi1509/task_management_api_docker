import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/libs/prisma/prisma.module';
import { GetTaskPermissionHandler } from 'src/modules/permission-handler/task/handlers/GetTaskPermissionHandler';
import { ModifyTaskPermissionHandler } from 'src/modules/permission-handler/task/handlers/ModifyTaskPermissionHandler';
import { UpdateSubTaskPermissionHandler } from 'src/modules/permission-handler/task/handlers/UpdateSubTaskPermissionHandler';

@Module({
  imports: [PrismaModule],
  providers: [
    ModifyTaskPermissionHandler,
    GetTaskPermissionHandler,
    UpdateSubTaskPermissionHandler
  ],
  exports: [
    ModifyTaskPermissionHandler,
    GetTaskPermissionHandler,
    UpdateSubTaskPermissionHandler
  ]
})
export class TaskPermissionHandlerModule {}
