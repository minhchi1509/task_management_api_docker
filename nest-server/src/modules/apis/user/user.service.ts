import { Injectable, NotFoundException } from '@nestjs/common';

import { DEFAULT_USER_AVATAR_URL } from 'src/common/constants/variables';
import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';
import { ChangeAvatarBodyDTO } from 'src/modules/apis/user/dto/change-avatar/ChangeAvatarBody.dto';
import { ChangeAvatarResponseDTO } from 'src/modules/apis/user/dto/change-avatar/ChangeAvatarResponse.dto';
import { ChangePasswordBodyDTO } from 'src/modules/apis/user/dto/change-password/ChangePasswordBody.dto';
import { BcryptService } from 'src/modules/libs/bcrypt/bcrypt.service';
import { CloudinaryService } from 'src/modules/libs/cloudinary/cloudinary.service';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private prismaService: PrismaService,
    private bcryptService: BcryptService
  ) {}

  changeAvatar = async (
    userId: string,
    body: ChangeAvatarBodyDTO
  ): Promise<ChangeAvatarResponseDTO> => {
    const { avatar } = body;
    const user = await this.prismaService.user
      .findUniqueOrThrow({ where: { id: userId } })
      .catch(() => {
        throw new NotFoundException('User not found');
      });
    const currentUserAvatarURL = user.avatar;
    if (currentUserAvatarURL !== DEFAULT_USER_AVATAR_URL) {
      await this.cloudinaryService.deleteFileByUrl(currentUserAvatarURL);
    }
    const uploadAvatarResponse = await this.cloudinaryService.uploadFile(
      avatar,
      { folder: 'avatar' }
    );
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        avatar: uploadAvatarResponse.secure_url
      }
    });
    return updatedUser;
  };

  changePassword = async (
    userId: string,
    body: ChangePasswordBodyDTO
  ): Promise<MessageResponseDTO> => {
    const { newPassword } = body;
    const hashedPassword = await this.bcryptService.hash(newPassword);
    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword
      }
    });
    return {
      message: 'Change password successfully'
    };
  };
}
