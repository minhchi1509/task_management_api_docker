import { Module } from '@nestjs/common';

import { GetAwardPermissionHandler } from 'src/modules/permission-handler/award/handlers/GetAwardPermissionHandler';
import { ModifyAwardPermissionHandler } from 'src/modules/permission-handler/award/handlers/ModifyAwardPermissionHandler';
import { ReceiveAwardPermissionHandler } from 'src/modules/permission-handler/award/handlers/ReceiveAwardPermissionHandler';

@Module({
  providers: [
    GetAwardPermissionHandler,
    ModifyAwardPermissionHandler,
    ReceiveAwardPermissionHandler
  ],
  exports: [
    GetAwardPermissionHandler,
    ModifyAwardPermissionHandler,
    ReceiveAwardPermissionHandler
  ]
})
export class AwardPermissionHandlerModule {}
