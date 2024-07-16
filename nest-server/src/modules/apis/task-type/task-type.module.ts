import { Module } from '@nestjs/common';

import { TaskTypeController } from './task-type.controller';
import { TaskTypeService } from './task-type.service';
import { AppPolicyModule } from 'src/modules/policy/app-policy.module';
import { TaskTypePolicyHandlerModule } from 'src/modules/policy-handler/task-type/task-type-policy-handler.module';

@Module({
  imports: [TaskTypePolicyHandlerModule, AppPolicyModule],
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
  exports: [TaskTypeService]
})
export class TaskTypeModule {}
