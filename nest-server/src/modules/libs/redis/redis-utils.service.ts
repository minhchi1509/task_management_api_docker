import { Injectable } from '@nestjs/common';

import { ETokenExpiration } from 'src/common/constants/enum';
import { RedisService } from 'src/modules/libs/redis/redis.service';

@Injectable()
export class RedisUtilsService {
  constructor(private redisService: RedisService) {}

  setResetPasswordToken = async (email: string, token: string) => {
    await this.redisService.set(
      `reset_password_token:${email}`,
      token,
      'EX',
      ETokenExpiration.RESET_PASSWORD_TOKEN
    );
  };

  deleteResetPasswordToken = async (email: string) => {
    await this.redisService.del(`reset_password_token:${email}`);
  };

  getResetPasswordToken = async (email: string) => {
    const token = await this.redisService.get(`reset_password_token:${email}`);
    return token;
  };
}
