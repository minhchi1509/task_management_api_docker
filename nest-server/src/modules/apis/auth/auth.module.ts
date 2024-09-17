import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptModule } from 'src/modules/libs/bcrypt/bcrypt.module';
import { MailQueueModule } from 'src/modules/libs/job-queue/mail-queue/mail-queue.module';
import { PrismaModule } from 'src/modules/libs/prisma/prisma.module';
import { RedisModule } from 'src/modules/libs/redis/redis.module';
import { TokenModule } from 'src/modules/libs/token/token.module';

@Module({
  imports: [
    TokenModule,
    BcryptModule,
    MailQueueModule,
    RedisModule,
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
