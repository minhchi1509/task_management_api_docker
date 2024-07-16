import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskTypeModule } from 'src/modules/apis/task-type/task-type.module';
import { AppPolicyModule } from 'src/modules/policy/app-policy.module';
import { TaskPolicyHandlerModule } from 'src/modules/policy-handler/task/task-policy-handler.module';

@Module({
  imports: [TaskTypeModule, AppPolicyModule, TaskPolicyHandlerModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
