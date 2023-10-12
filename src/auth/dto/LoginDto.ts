/** @format */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  email: string;

  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  password: string;

  //type
  @ApiProperty()
  @IsNotEmpty()
  type: string;
}
