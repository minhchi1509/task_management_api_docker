import { Module } from '@nestjs/common';

import { AwardController } from './award.controller';
import { AwardService } from './award.service';
import { AwardPolicyHandlerModule } from 'src/modules/policy-handler/award/award-policy-handler.module';

@Module({
  imports: [AwardPolicyHandlerModule],
  controllers: [AwardController],
  providers: [AwardService]
})
export class AwardModule {}
