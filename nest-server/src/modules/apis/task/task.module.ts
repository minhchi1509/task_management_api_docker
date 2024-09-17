import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskTypeModule } from 'src/modules/apis/task-type/task-type.module';
import { PrismaModule } from 'src/modules/libs/prisma/prisma.module';
import { TaskPermissionHandlerModule } from 'src/modules/permission-handler/task/task-permission-handler.module';

@Module({
  imports: [TaskTypeModule, TaskPermissionHandlerModule, PrismaModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
