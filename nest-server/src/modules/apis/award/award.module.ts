import { Module } from '@nestjs/common';

import { AwardController } from './award.controller';
import { AwardService } from './award.service';
import { AppPolicyModule } from 'src/modules/policy/app-policy.module';
import { AwardPolicyHandlerModule } from 'src/modules/policy-handler/award/award-policy-handler.module';

@Module({
  imports: [AwardPolicyHandlerModule, AppPolicyModule],
  controllers: [AwardController],
  providers: [AwardService]
})
export class AwardModule {}
