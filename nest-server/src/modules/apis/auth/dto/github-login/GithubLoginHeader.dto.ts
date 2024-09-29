import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { EHeaderKey } from 'src/common/constants/common.enum';
import { Trim } from 'src/common/decorators/sanitizer/trim.sanitizer';

export class GithubLoginHeaderDTO {
  @ApiProperty({ name: EHeaderKey.GITHUB_ACCESS_TOKEN })
  @Expose({ name: EHeaderKey.GITHUB_ACCESS_TOKEN })
  @Trim()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
