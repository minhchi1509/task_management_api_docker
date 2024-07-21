import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from 'src/modules/libs/token/token.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
