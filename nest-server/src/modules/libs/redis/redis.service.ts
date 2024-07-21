import { Injectable } from '@nestjs/common';

import { ETokenExpiration } from 'src/common/constants/common.enum';
import { RedisProvider } from 'src/modules/libs/redis/redis.provider';

@Injectable()
export class RedisService {
  constructor(private redis: RedisProvider) {}

  setResetPasswordToken = async (email: string, token: string) => {
    await this.redis.set(
      `reset_password_token:${email}`,
      token,
      'EX',
      ETokenExpiration.RESET_PASSWORD_TOKEN
    );
  };

  deleteResetPasswordToken = async (email: string) => {
    await this.redis.del(`reset_password_token:${email}`);
  };

  getResetPasswordToken = async (email: string) => {
    const token = await this.redis.get(`reset_password_token:${email}`);
    return token;
  };

  setUserRefreshToken = async (userId: string, refreshToken: string) => {
    await this.redis.set(
      `refresh_token:${userId}`,
      refreshToken,
      'EX',
      ETokenExpiration.REFRESH_TOKEN
    );
  };

  getUserRefreshToken = async (userId: string) => {
    const refreshToken = await this.redis.get(`refresh_token:${userId}`);
    return refreshToken;
  };
}
