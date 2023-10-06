/** @format */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DetailParamDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
