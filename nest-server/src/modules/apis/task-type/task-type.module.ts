import { Module } from '@nestjs/common';

import { TaskTypeController } from './task-type.controller';
import { TaskTypeService } from './task-type.service';
import { TaskTypePermissionHandlerModule } from 'src/modules/permission-handler/task-type/task-type-permission-handler.module';

@Module({
  imports: [TaskTypePermissionHandlerModule],
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
  exports: [TaskTypeService]
})
export class TaskTypeModule {}
