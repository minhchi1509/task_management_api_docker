import { Module } from '@nestjs/common';

import { AwardController } from './award.controller';
import { AwardService } from './award.service';
import { AwardPermissionHandlerModule } from 'src/modules/permission-handler/award/award-permission-handler.module';

@Module({
  imports: [AwardPermissionHandlerModule],
  controllers: [AwardController],
  providers: [AwardService]
})
export class AwardModule {}
