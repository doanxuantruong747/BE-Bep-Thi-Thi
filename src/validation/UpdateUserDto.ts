/** @format */

import { IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  id: number;

  @ValidateIf((object, value) => value !== null)
  name: string;

  @ValidateIf((object, value) => value !== null)
  password: string;

  @ValidateIf((object, value) => value !== null)
  role_id: number;

  @ValidateIf((object, value) => value !== null)
  email: string;

  @ValidateIf((object, value) => value !== null)
  avatar: string;
}
