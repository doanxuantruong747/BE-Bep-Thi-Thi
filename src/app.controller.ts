/** @format */

import { Controller, Get, HttpCode, HttpStatus, Query, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'decorators/public.decorator';
import { join } from 'path';
import { createReadStream } from 'fs';
import { ApiExcludeController } from '@nestjs/swagger';
// import * as multer from 'multer';
@ApiExcludeController(true)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get('images')
  async images(@Query() param): Promise<StreamableFile> {
    console.log('get image');
    try {
      const file = createReadStream(join(process.cwd(), `public/images/${param?.path}`));
      return new StreamableFile(file);
    } catch (error) {
      return null;
    }
  }
}
