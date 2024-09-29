import {
  Body,
  Controller,
  Headers,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { ApiExceptionResponse } from 'src/common/decorators/common.decorator';
import { PublicRoute } from 'src/common/decorators/metadata.decorator';
import { RequestHeader } from 'src/common/decorators/request-object.decorator';
import { TwoFactorCodeBodyDTO } from 'src/common/dto/TwoFactorCodeBody.dto';
import { GithubLoginHeaderDTO } from 'src/modules/apis/auth/dto/github-login/GithubLoginHeader.dto';
import { GoogleLoginHeaderDTO } from 'src/modules/apis/auth/dto/google-login/GoogleLoginHeader.dto';
import { LoginResponseDTO } from 'src/modules/apis/auth/dto/login/LoginResponse.dto';
import { OAuthService } from 'src/modules/apis/auth/services/oauth.service';

@ApiTags('OAuth')
@ApiExceptionResponse()
@Controller('oauth')
@PublicRoute()
export class OAuthController {
  constructor(private oauthService: OAuthService) {}

  @Post('google/login')
  async googleLogin(
    @Headers()
    @RequestHeader(
      new ValidationPipe({
        validateCustomDecorators: true,
        transform: true,
        stopAtFirstError: true
      })
    )
    headers: GoogleLoginHeaderDTO,
    @Body()
    body: TwoFactorCodeBodyDTO
  ): Promise<LoginResponseDTO> {
    const { idToken } = headers;
    const { otpCode } = body;
    const response = await this.oauthService.googleLogin(idToken, otpCode);
    return plainToInstance(LoginResponseDTO, response);
  }

  @Post('github/login')
  async githubLogin(
    @Headers()
    @RequestHeader(
      new ValidationPipe({
        validateCustomDecorators: true,
        transform: true,
        stopAtFirstError: true
      })
    )
    headers: GithubLoginHeaderDTO
  ): Promise<LoginResponseDTO> {
    const { accessToken } = headers;
    const response = await this.oauthService.githubLogin(accessToken);
    return plainToInstance(LoginResponseDTO, response);
  }
}
