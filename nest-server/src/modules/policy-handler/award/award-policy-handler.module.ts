import { Module } from '@nestjs/common';

import { GetAwardPolicyHandler } from 'src/modules/policy-handler/award/handlers/GetAwardPolicyHandler';
import { ModifyAwardPolicyHandler } from 'src/modules/policy-handler/award/handlers/ModifyAwardPolicyHandler';
import { ReceiveAwardPolicyHandler } from 'src/modules/policy-handler/award/handlers/ReceiveAwardPolicyHandler';

@Module({
  providers: [
    GetAwardPolicyHandler,
    ModifyAwardPolicyHandler,
    ReceiveAwardPolicyHandler
  ],
  exports: [
    GetAwardPolicyHandler,
    ModifyAwardPolicyHandler,
    ReceiveAwardPolicyHandler
  ]
})
export class AwardPolicyHandlerModule {}
