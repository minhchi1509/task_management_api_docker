import { Module } from '@nestjs/common';

import { GetTaskTypePermissionHandler } from 'src/modules/permission-handler/task-type/handlers/GetTaskTypePermissionHandler';
import { ModifyTaskTypePermissionHandler } from 'src/modules/permission-handler/task-type/handlers/ModifyTaskTypePermissionHandler';

@Module({
  providers: [GetTaskTypePermissionHandler, ModifyTaskTypePermissionHandler],
  exports: [GetTaskTypePermissionHandler, ModifyTaskTypePermissionHandler]
})
export class TaskTypePermissionHandlerModule {}
