import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptModule } from 'src/modules/libs/bcrypt/bcrypt.module';
import { JobQueueModule } from 'src/modules/libs/job-queue/job-queue.module';
import { JwtUtilsModule } from 'src/modules/libs/jwt-utils/jwt-utils.module';
import { RedisModule } from 'src/modules/libs/redis/redis.module';

@Module({
  imports: [JwtUtilsModule, BcryptModule, JobQueueModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
