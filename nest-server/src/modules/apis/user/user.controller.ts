import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import {
  ApiExceptionResponse,
  UseFormData
} from 'src/common/decorators/common.decorator';
import { UserId } from 'src/common/decorators/request-object.decorator';
import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';
import { EnableTwoFABodyDTO } from 'src/modules/apis/user/dto/2fa/EnableTwoFABody.dto';
import { GenerateTwoFAResponseDTO } from 'src/modules/apis/user/dto/2fa/GenerateTwoFAResponse.dto';
import { ModifyTwoFAResponseDTO } from 'src/modules/apis/user/dto/2fa/ModifyTwoFAResponse.dto';
import { ChangeAvatarBodyDTO } from 'src/modules/apis/user/dto/change-avatar/ChangeAvatarBody.dto';
import { ChangeAvatarResponseDTO } from 'src/modules/apis/user/dto/change-avatar/ChangeAvatarResponse.dto';
import { ChangePasswordBodyDTO } from 'src/modules/apis/user/dto/change-password/ChangePasswordBody.dto';
import { UserService } from 'src/modules/apis/user/user.service';

@ApiTags('User')
@ApiBearerAuth()
@ApiExceptionResponse()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put('change-avatar')
  @UseFormData()
  async changeAvatar(
    @Body() body: ChangeAvatarBodyDTO,
    @UserId() userId: string
  ): Promise<ChangeAvatarResponseDTO> {
    const response = await this.userService.changeAvatar(userId, body);
    return plainToInstance(ChangeAvatarResponseDTO, response);
  }

  @Put('change-password')
  async changePassword(
    @Body() body: ChangePasswordBodyDTO,
    @UserId() userId: string
  ): Promise<MessageResponseDTO> {
    const response = await this.userService.changePassword(userId, body);
    return plainToInstance(MessageResponseDTO, response);
  }

  @Post('generate-2fa')
  async generateTwoFA(
    @UserId() userId: string
  ): Promise<GenerateTwoFAResponseDTO> {
    const response = await this.userService.generateTwoFA(userId);
    return plainToInstance(GenerateTwoFAResponseDTO, response);
  }

  @Put('enable-2fa')
  async enableTwoFA(
    @UserId() userId: string,
    @Body() body: EnableTwoFABodyDTO
  ): Promise<ModifyTwoFAResponseDTO> {
    const { otpCode } = body;
    const response = await this.userService.enableTwoFA(userId, otpCode);
    return plainToInstance(ModifyTwoFAResponseDTO, response);
  }

  @Put('disable-2fa')
  async disableTwoFA(
    @UserId() userId: string
  ): Promise<ModifyTwoFAResponseDTO> {
    const response = await this.userService.disableTwoFA(userId);
    return plainToInstance(ModifyTwoFAResponseDTO, response);
  }
}
