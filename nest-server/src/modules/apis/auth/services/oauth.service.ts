import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';

import { ELoginExceptionErrorType } from 'src/common/constants/common.enum';
import { IEnvironmentVariables } from 'src/common/types/env.type';
import { TGithubUserResponse, TJWTPayload } from 'src/common/types/token.type';
import { GithubLoginBodyDTO } from 'src/modules/apis/auth/dto/github-login/GithubLoginBody.dto';
import { GoogleLoginBodyDTO } from 'src/modules/apis/auth/dto/google-login/GoogleLoginBody.dto';
import { LoginResponseDTO } from 'src/modules/apis/auth/dto/login/LoginResponse.dto';
import { LoginException } from 'src/modules/apis/auth/exceptions/LoginException';
import { GoogleOAuthService } from 'src/modules/libs/google-oauth/google-oauth.service';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';
import { RedisService } from 'src/modules/libs/redis/redis.service';
import { TokenService } from 'src/modules/libs/token/token.service';

@Injectable()
export class OAuthService {
  constructor(
    private redisService: RedisService,
    private tokenService: TokenService,
    private prismaService: PrismaService,
    private googleOAuthService: GoogleOAuthService,
    private httpService: HttpService,
    private configService: ConfigService<IEnvironmentVariables>
  ) {}

  googleLogin = async (body: GoogleLoginBodyDTO): Promise<LoginResponseDTO> => {
    const { googleIdToken, otpCode } = body;
    const { email, picture, name } =
      await this.googleOAuthService.verifyIdToken(googleIdToken);

    if (!email || !picture || !name) {
      throw new LoginException({
        message: 'Not enough information from Google',
        errorType: ELoginExceptionErrorType.INVALID_CREDENTIALS
      });
    }

    const currentUser = await this.prismaService.user.findFirst({
      where: { email }
    });

    let user = currentUser;

    if (!currentUser) {
      user = await this.prismaService.user.create({
        data: {
          email,
          fullName: name,
          avatar: picture
        }
      });
    }

    if (user?.isEnableTwoFactorAuth) {
      if (!otpCode) {
        throw new LoginException({
          message: 'Two factor authenticator code is required',
          errorType: ELoginExceptionErrorType.REQUIRED_2FA_OTP
        });
      }
      const twofaSecretKey = await this.redisService.getTwoFASecretKey(
        user?.id || ''
      );
      if (!twofaSecretKey) {
        throw new InternalServerErrorException(
          `Can not find 2FA secret key of user with id: ${user?.id} in database`
        );
      }
      const isValidOtp = authenticator.verify({
        secret: twofaSecretKey,
        token: otpCode || ''
      });

      if (!isValidOtp) {
        throw new LoginException({
          message: 'Two factor authenticator code is invalid',
          errorType: ELoginExceptionErrorType.INVALID_2FA_OTP
        });
      }
    }

    const jwtPayload: TJWTPayload = {
      sub: user!.id,
      email: user!.email
    };
    const { token: accessToken, expiresIn } =
      await this.tokenService.signAccessToken(jwtPayload);
    const refreshToken = await this.tokenService.signRefreshToken(jwtPayload);

    await this.redisService.setUserRefreshToken(user!.id, refreshToken);

    return {
      user: user!,
      accessToken,
      refreshToken,
      expiresIn
    };
  };

  githubLogin = async (body: GithubLoginBodyDTO): Promise<LoginResponseDTO> => {
    const { githubAccessToken, otpCode } = body;
    const githubUserInfor = {
      email: '',
      fullName: '',
      avatar: ''
    };
    try {
      const githubClientId = this.configService.get<string>(
        'GITHUB_CLIENT_ID'
      ) as string;
      const githubClientSecret = this.configService.get<string>(
        'GITHUB_CLIENT_SECRET'
      ) as string;

      const response = await this.httpService.axiosRef.post<{
        user: TGithubUserResponse;
      }>(
        `https://api.github.com/applications/${githubClientId}/token`,
        {
          access_token: githubAccessToken
        },
        {
          headers: {
            Authorization: `Basic ${btoa(`${githubClientId}:${githubClientSecret}`)}`
          }
        }
      );

      const githubUsername = response.data.user.login;

      const { data } = await this.httpService.axiosRef.get<TGithubUserResponse>(
        `https://api.github.com/users/${githubUsername}`,
        {
          headers: {
            Authorization: `token ${githubAccessToken}`
          }
        }
      );
      githubUserInfor.email = data.email;
      githubUserInfor.fullName = data.name;
      githubUserInfor.avatar = data.avatar_url;
    } catch (error) {
      throw new LoginException({
        message: 'Invalid Github Access Token',
        errorType: ELoginExceptionErrorType.INVALID_CREDENTIALS
      });
    }

    const currentUser = await this.prismaService.user.findFirst({
      where: { email: githubUserInfor.email }
    });

    let user = currentUser;

    if (!currentUser) {
      user = await this.prismaService.user.create({
        data: {
          ...githubUserInfor
        }
      });
    }

    if (user?.isEnableTwoFactorAuth) {
      if (!otpCode) {
        throw new LoginException({
          message: 'Two factor authenticator code is required',
          errorType: ELoginExceptionErrorType.REQUIRED_2FA_OTP
        });
      }
      const twofaSecretKey = await this.redisService.getTwoFASecretKey(
        user?.id || ''
      );
      if (!twofaSecretKey) {
        throw new InternalServerErrorException(
          `Can not find 2FA secret key of user with id: ${user?.id} in database`
        );
      }
      const isValidOtp = authenticator.verify({
        secret: twofaSecretKey,
        token: otpCode || ''
      });

      if (!isValidOtp) {
        throw new LoginException({
          message: 'Two factor authenticator code is invalid',
          errorType: ELoginExceptionErrorType.INVALID_2FA_OTP
        });
      }
    }

    const jwtPayload: TJWTPayload = {
      sub: user!.id,
      email: user!.email
    };
    const { token: accessToken, expiresIn } =
      await this.tokenService.signAccessToken(jwtPayload);
    const refreshToken = await this.tokenService.signRefreshToken(jwtPayload);

    await this.redisService.setUserRefreshToken(user!.id, refreshToken);

    return {
      user: user!,
      accessToken,
      refreshToken,
      expiresIn
    };
  };
}
