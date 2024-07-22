import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { PublicRoute } from 'src/common/decorators/metadata.decorator';
import { ExceptionResponse } from 'src/common/dto/ExceptionResponse.dto';
import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';
import { AuthService } from 'src/modules/apis/auth/auth.service';
import { LoginBodyDTO } from 'src/modules/apis/auth/dto/login/LoginBody.dto';
import { LoginResponseDTO } from 'src/modules/apis/auth/dto/login/LoginResponse.dto';
import { RefreshTokenBodyDto } from 'src/modules/apis/auth/dto/refresh-token/RefreshTokenBody.dto';
import { RefreshTokenResponseDto } from 'src/modules/apis/auth/dto/refresh-token/RefreshTokenResponse.dto';
import { ResetPasswordBodyDto } from 'src/modules/apis/auth/dto/reset-password/ResetPasswordBody.dto';
import { ResetPasswordResponseDto } from 'src/modules/apis/auth/dto/reset-password/ResetPasswordResponse.dto';
import { SendResetPasswordMailBodyDto } from 'src/modules/apis/auth/dto/send-reset-password-mail/SendResetPasswordMailBody.dto';
import { SignupRequestDTO } from 'src/modules/apis/auth/dto/signup/SignupBody.dto';
import { SignupResponseDTO } from 'src/modules/apis/auth/dto/signup/SignupResponse.dto';

@ApiTags('Auth')
@ApiBadRequestResponse({ type: ExceptionResponse })
@Controller('auth')
@PublicRoute()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupRequestDTO): Promise<SignupResponseDTO> {
    const response = await this.authService.signup(body);
    return plainToInstance(SignupResponseDTO, response);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginBodyDTO): Promise<LoginResponseDTO> {
    const response = await this.authService.login(body);
    return plainToInstance(LoginResponseDTO, response);
  }

  @Post('send-reset-password-mail')
  async sendResetPasswordMail(
    @Body() body: SendResetPasswordMailBodyDto
  ): Promise<MessageResponseDTO> {
    const response = await this.authService.sendResetPasswordMail(body.email);
    return plainToInstance(MessageResponseDTO, response);
  }

  @Put('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordBodyDto
  ): Promise<ResetPasswordResponseDto> {
    const response = await this.authService.resetPassword(body);
    return plainToInstance(ResetPasswordResponseDto, response);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: RefreshTokenBodyDto
  ): Promise<RefreshTokenResponseDto> {
    const response = await this.authService.refreshToken(body);
    return plainToInstance(RefreshTokenResponseDto, response);
  }
}
