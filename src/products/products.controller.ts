/** @format */

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFilename, parsePaginate } from 'utils/libs';
import { NewsService } from './products.service';
import { Public } from 'decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  // create a news
  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => generateFilename(req, file, cb),
      }),
    }),
  )
  async createNews(@UploadedFile() thumbnail, @Body() body: any) {
    console.log('[file--]', thumbnail, body);
    if (thumbnail?.['filename']) {
      body.thumbnail = thumbnail['filename'];
    }
    return this.newsService.createNews(body);
  }

  // upload images
  @HttpCode(HttpStatus.OK)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => generateFilename(req, file, cb),
      }),
    }),
  )
  async uploadImage(@UploadedFile() image) {
    console.log('--------uploadImage--------', image);
    return { message: 'upload successful', filename: image?.filename };
  }

  // get all
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll(@Query() paramsDto: Record<string, any>) {
    console.log('paramsDto', paramsDto);
    const { offset, limit, search, page } = parsePaginate(paramsDto);
    try {
      return this.newsService.findAll({ offset, limit, search, page });
    } catch (error) {
      console.log('----error get all News --- ', error);
    }
  }

  // get single news item
  @HttpCode(HttpStatus.OK)
  @Get('')
  singleNews(@Query() paramsDto: Record<string, any>) {
    console.log('paramsDto', paramsDto);
    const { id } = parsePaginate(paramsDto);
    try {
      return this.newsService.singleNews({ id });
    } catch (error) {
      console.log('----error get single News --- ', error);
    }
  }

  // Update News
  @HttpCode(HttpStatus.OK)
  @Post('update')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => generateFilename(req, file, cb),
      }),
    }),
  )
  async updateNews(@UploadedFile() thumbnail, @Body() body: any) {
    console.log('[file--]', thumbnail, body);
    if (thumbnail?.['filename']) {
      body.thumbnail = thumbnail['filename'];
    }
    return this.newsService.updateNews(body);
  }

  // Remove News
  @HttpCode(HttpStatus.OK)
  @Delete('')
  remove(@Query() paramsDto: Record<string, any>) {
    console.log('----------paramsDto----------', paramsDto);
    const { id } = parsePaginate(paramsDto);
    try {
      return this.newsService.remove({ id });
    } catch (error) {
      console.log('-----error remove-----', error);
    }
  }
}
