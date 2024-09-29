import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';

import { DEFAULT_USER_AVATAR_URL } from 'src/common/constants/common.constant';
import { MessageResponseDTO } from 'src/common/dto/MessageResponse.dto';
import { GenerateTwoFAResponseDTO } from 'src/modules/apis/user/dto/2fa/GenerateTwoFAResponse.dto';
import { ModifyTwoFAResponseDTO } from 'src/modules/apis/user/dto/2fa/ModifyTwoFAResponse.dto';
import { ChangeAvatarBodyDTO } from 'src/modules/apis/user/dto/change-avatar/ChangeAvatarBody.dto';
import { ChangeAvatarResponseDTO } from 'src/modules/apis/user/dto/change-avatar/ChangeAvatarResponse.dto';
import { ChangePasswordBodyDTO } from 'src/modules/apis/user/dto/change-password/ChangePasswordBody.dto';
import { BcryptService } from 'src/modules/libs/bcrypt/bcrypt.service';
import { CloudinaryService } from 'src/modules/libs/cloudinary/cloudinary.service';
import { PrismaService } from 'src/modules/libs/prisma/prisma.service';
import { RedisService } from 'src/modules/libs/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private prismaService: PrismaService,
    private bcryptService: BcryptService,
    private redisService: RedisService
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

  generateTwoFA = async (userId: string): Promise<GenerateTwoFAResponseDTO> => {
    const user = await this.prismaService.user
      .findUniqueOrThrow({ where: { id: userId } })
      .catch(() => {
        throw new NotFoundException('User not found');
      });

    if (user.isEnableTwoFactorAuth) {
      throw new BadRequestException(
        'Two-factor authentication has already been enabled. Turn it off before generating a new secret key'
      );
    }

    const serviceName = 'Task Management App';
    const secretKey = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, serviceName, secretKey);
    const QRCodeImageURL = await qrcode.toDataURL(otpauthUrl);
    await this.redisService.setTwoFASecretKey(userId, secretKey);

    return {
      user,
      qrCodeUrl: QRCodeImageURL,
      secretKey
    };
  };

  enableTwoFA = async (
    userId: string,
    otpCode: string
  ): Promise<ModifyTwoFAResponseDTO> => {
    const user = await this.prismaService.user
      .findFirstOrThrow({ where: { id: userId } })
      .catch(() => {
        throw new NotFoundException('User not found');
      });

    if (user.isEnableTwoFactorAuth) {
      throw new BadRequestException(
        'Two-factor authentication has already been enabled'
      );
    }

    const userTwoFASecretKey =
      await this.redisService.getTwoFASecretKey(userId);
    if (!userTwoFASecretKey) {
      throw new InternalServerErrorException(
        `Can not find 2FA secret key of user with id: ${user?.id} in database`
      );
    }
    const isOTPValid = authenticator.verify({
      secret: userTwoFASecretKey,
      token: otpCode
    });

    if (!isOTPValid) {
      throw new BadRequestException('OTP code is invalid');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        isEnableTwoFactorAuth: true
      }
    });

    return {
      message: 'Enable two-factor authentication successfully',
      user: updatedUser
    };
  };

  disableTwoFA = async (userId: string): Promise<ModifyTwoFAResponseDTO> => {
    const user = await this.prismaService.user
      .findFirstOrThrow({ where: { id: userId } })
      .catch(() => {
        throw new NotFoundException('User not found');
      });

    if (!user.isEnableTwoFactorAuth) {
      throw new BadRequestException(
        'Two-factor authentication has not been enabled'
      );
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        isEnableTwoFactorAuth: false
      }
    });
    await this.redisService.deleteTwoFASecretKey(userId);

    return {
      user: updatedUser,
      message: 'Disable two-factor authentication successfully'
    };
  };
}
