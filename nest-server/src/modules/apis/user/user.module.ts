import { Module } from '@nestjs/common';

import { UserController } from 'src/modules/apis/user/user.controller';
import { UserService } from 'src/modules/apis/user/user.service';
import { BcryptModule } from 'src/modules/libs/bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
