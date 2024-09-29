import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { EHeaderKey } from 'src/common/constants/common.enum';
import { Trim } from 'src/common/decorators/sanitizer/trim.sanitizer';

export class GoogleLoginHeaderDTO {
  @ApiProperty({ name: EHeaderKey.GOOGLE_ID_TOKEN })
  @Expose({ name: EHeaderKey.GOOGLE_ID_TOKEN })
  @Trim()
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
