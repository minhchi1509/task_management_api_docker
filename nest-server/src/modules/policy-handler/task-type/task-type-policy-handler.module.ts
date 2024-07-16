import { Module } from '@nestjs/common';

import { GetTaskTypePolicyHandler } from 'src/modules/policy-handler/task-type/handlers/GetTaskTypePolicyHandler';
import { ModifyTaskTypeHandler } from 'src/modules/policy-handler/task-type/handlers/ModifyTaskTypeHandler';

@Module({
  providers: [GetTaskTypePolicyHandler, ModifyTaskTypeHandler],
  exports: [GetTaskTypePolicyHandler, ModifyTaskTypeHandler]
})
export class TaskTypePolicyHandlerModule {}
