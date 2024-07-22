import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile
} from 'nestjs-form-data';

import { MAX_AVATAR_FILE_SIZE } from 'src/common/constants/file.constant';

export class ChangeAvatarBodyDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  @IsFile({ message: 'Avatar must be a file' })
  @HasMimeType(['image/*'], { message: 'Avatar must be an image' })
  @MaxFileSize(MAX_AVATAR_FILE_SIZE, {
    message: 'File size must be lower than 5MB'
  })
  avatar: MemoryStoredFile;
}
