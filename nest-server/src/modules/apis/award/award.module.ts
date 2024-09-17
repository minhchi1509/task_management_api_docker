import { Module } from '@nestjs/common';

import { AwardController } from './award.controller';
import { AwardService } from './award.service';
import { PrismaModule } from 'src/modules/libs/prisma/prisma.module';
import { AwardPermissionHandlerModule } from 'src/modules/permission-handler/award/award-permission-handler.module';

@Module({
  imports: [AwardPermissionHandlerModule, PrismaModule],
  controllers: [AwardController],
  providers: [AwardService]
})
export class AwardModule {}
