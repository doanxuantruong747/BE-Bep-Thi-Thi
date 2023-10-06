/** @format */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { ValidateIf, IsOptional } from 'class-validator';

export class SearchParamDto {
  @ApiPropertyOptional({ type: 'string', nullable: true })
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  search?: string = '';

  @ApiPropertyOptional({ type: 'number', nullable: true })
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  limit: number;

  @ApiPropertyOptional({ type: 'number', nullable: true })
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  page: number;
}
