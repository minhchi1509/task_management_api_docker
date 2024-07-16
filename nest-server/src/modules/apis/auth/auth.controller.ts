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
import { AuthService } from 'src/modules/apis/auth/auth.service';
import { LoginBodyDTO } from 'src/modules/apis/auth/dto/login/LoginBody.dto';
import { LoginResponseDTO } from 'src/modules/apis/auth/dto/login/LoginResponse.dto';
import { ResetPasswordBodyDto } from 'src/modules/apis/auth/dto/reset-password/ResetPasswordBody.dto';
import { ResetPasswordResponseDto } from 'src/modules/apis/auth/dto/reset-password/ResetPasswordResponse.dto';
import { SendResetPasswordMailBodyDto } from 'src/modules/apis/auth/dto/send-reset-password-mail/SendResetPasswordMailBody.dto';
import { SendResetPasswordMailResponseDto } from 'src/modules/apis/auth/dto/send-reset-password-mail/SendResetPasswordMailResponse.dto';
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
  ): Promise<SendResetPasswordMailResponseDto> {
    const response = await this.authService.sendResetPasswordMail(body.email);
    return plainToInstance(SendResetPasswordMailResponseDto, response);
  }

  @Put('reset-password')
  async resetPassword(
    @Body() body: ResetPasswordBodyDto
  ): Promise<ResetPasswordResponseDto> {
    const response = await this.authService.resetPassword(body);
    return plainToInstance(ResetPasswordResponseDto, response);
  }
}
