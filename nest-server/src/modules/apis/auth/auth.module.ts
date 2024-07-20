import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptModule } from 'src/modules/libs/bcrypt/bcrypt.module';
import { MailQueueModule } from 'src/modules/libs/job-queue/mail-queue/mail-queue.module';
import { JwtUtilsModule } from 'src/modules/libs/jwt-utils/jwt-utils.module';

@Module({
  imports: [JwtUtilsModule, BcryptModule, MailQueueModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
