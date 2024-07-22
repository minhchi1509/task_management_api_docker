import { Body, Controller, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { UseFormData } from 'src/common/decorators/use-form-data.decorator';
import { UserId } from 'src/common/decorators/user.decorator';
import { ExceptionResponse } from 'src/common/dto/ExceptionResponse.dto';
import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';
import { ChangeAvatarBodyDTO } from 'src/modules/apis/user/dto/change-avatar/ChangeAvatarBody.dto';
import { ChangeAvatarResponseDTO } from 'src/modules/apis/user/dto/change-avatar/ChangeAvatarResponse.dto';
import { ChangePasswordBodyDTO } from 'src/modules/apis/user/dto/change-password/ChangePasswordBody.dto';
import { UserService } from 'src/modules/apis/user/user.service';

@ApiTags('User')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ExceptionResponse })
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
}
