import { Module } from '@nestjs/common';

import { TaskTypeController } from './task-type.controller';
import { TaskTypeService } from './task-type.service';
import { PrismaModule } from 'src/modules/libs/prisma/prisma.module';
import { TaskTypePermissionHandlerModule } from 'src/modules/permission-handler/task-type/task-type-permission-handler.module';

@Module({
  imports: [TaskTypePermissionHandlerModule, PrismaModule],
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
  exports: [TaskTypeService]
})
export class TaskTypeModule {}
