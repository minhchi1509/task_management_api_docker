import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { ApiExceptionResponse } from 'src/common/decorators/common.decorator';
import { PublicRoute } from 'src/common/decorators/metadata.decorator';
import { GithubLoginBodyDTO } from 'src/modules/apis/auth/dto/github-login/GithubLoginBody.dto';
import { GoogleLoginBodyDTO } from 'src/modules/apis/auth/dto/google-login/GoogleLoginBody.dto';
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
    @Body() body: GoogleLoginBodyDTO
  ): Promise<LoginResponseDTO> {
    const response = await this.oauthService.googleLogin(body);
    return plainToInstance(LoginResponseDTO, response);
  }

  @Post('github/login')
  async githubLogin(
    @Body() body: GithubLoginBodyDTO
  ): Promise<LoginResponseDTO> {
    const response = await this.oauthService.githubLogin(body);
    return plainToInstance(LoginResponseDTO, response);
  }
}
