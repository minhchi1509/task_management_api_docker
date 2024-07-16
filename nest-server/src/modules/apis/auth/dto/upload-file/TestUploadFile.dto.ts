import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import {
  HasMimeType,
  IsFiles,
  MaxFileSize,
  MemoryStoredFile
} from 'nestjs-form-data';

import { Trim } from 'src/common/decorators/sanitizer/trim.sanitizer';

class AddressDTO {
  @Trim()
  @IsNotEmpty()
  street: string;

  @Trim({ each: true })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  city: string[];
}

export class FormDataTestDto {
  // @Trim()
  // @IsOptional()
  // @IsString()
  // name?: string;
  //
  // @Type(() => Number)
  // @IsNumber()
  // age: number;
  //
  // @IsNotEmpty()
  // @IsEnum(TaskStatus)
  // @ApiProperty({ enum: TaskStatus })
  // status: TaskStatus;
  //
  // @ValidateNested()
  // @Type(() => AddressDTO)
  // address: AddressDTO;
  //
  // @ToBoolean({ each: true })
  // @IsBoolean({ each: true })
  // isForm: boolean[];
  //
  // @IsNotEmpty()
  // @IsDateString()
  // date: Date;

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  @IsNotEmpty({ message: 'Avatars is require!' })
  @IsArray()
  @ArrayMaxSize(2, { message: 'Max 2 files' })
  @IsFiles({ message: 'Avatar must be file' })
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'], {
    each: true,
    message: 'Avatar must be jpeg, jpg, png'
  })
  @MaxFileSize(2 * 1024 * 1024, {
    message: 'File size must be lower than 2MB',
    each: true
  })
  avatars?: MemoryStoredFile[];
}
