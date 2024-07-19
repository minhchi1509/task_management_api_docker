import { Module } from '@nestjs/common';

import { TaskTypeController } from './task-type.controller';
import { TaskTypeService } from './task-type.service';
import { TaskTypePolicyHandlerModule } from 'src/modules/policy-handler/task-type/task-type-policy-handler.module';

@Module({
  imports: [TaskTypePolicyHandlerModule],
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
  exports: [TaskTypeService]
})
export class TaskTypeModule {}
