import { Module } from '@nestjs/common';

import { GetTaskPolicyHandler } from 'src/modules/policy-handler/task/handlers/GetTaskPolicyHandler';
import { ModifyTaskPolicyHandler } from 'src/modules/policy-handler/task/handlers/ModifyTaskPolicyHandler';
import { UpdateSubTaskPolicyHandler } from 'src/modules/policy-handler/task/handlers/UpdateSubTaskPolicyHandler';

@Module({
  providers: [
    ModifyTaskPolicyHandler,
    GetTaskPolicyHandler,
    UpdateSubTaskPolicyHandler
  ],
  exports: [
    ModifyTaskPolicyHandler,
    GetTaskPolicyHandler,
    UpdateSubTaskPolicyHandler
  ]
})
export class TaskPolicyHandlerModule {}
