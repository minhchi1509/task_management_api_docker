import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from 'src/common/decorators/sanitizer/trim.sanitizer';
import { TwoFactorCodeBodyDTO } from 'src/common/dto/TwoFactorCodeBody.dto';

export class GithubLoginBodyDTO extends TwoFactorCodeBodyDTO {
  @Trim()
  @IsString()
  @IsNotEmpty()
  githubAccessToken: string;
}
