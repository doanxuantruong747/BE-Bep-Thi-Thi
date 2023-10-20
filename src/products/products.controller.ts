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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFilename, parsePaginate, resJson } from 'utils/libs';
import { ProductService } from './products.service';
import { Public } from 'decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // create a products
  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => generateFilename(req, file, cb),
      }),
    }),
  )
  async createNews(@UploadedFiles() images, @Body() body: any) {
    try {
      return this.productService.createProduct(images, body);
    } catch (error) {
      return resJson({ message: error.message });
    }
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
      return this.productService.findAll({ offset, limit, search, page });
    } catch (error) {
      console.log('----error get all News --- ', error);
    }
  }

  // get single news item
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('')
  singleProduct(@Query() paramsDto: Record<string, any>) {
    console.log('paramsDto', paramsDto);
    const { id } = parsePaginate(paramsDto);
    try {
      return this.productService.singleProduct({ id });
    } catch (error) {
      return resJson({ message: error.message });
    }
  }

  //Update Product
  @HttpCode(HttpStatus.OK)
  @Post('update')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './public/images/',
        filename: (req, file, cb) => generateFilename(req, file, cb),
      }),
    }),
  )
  async updateProduct(@UploadedFiles() images, @Body() body: any) {
    try {
      return this.productService.updateProduct(images, body);
    } catch (error) {
      return resJson({ message: error.message });
    }
  }

  // Remove Product
  @HttpCode(HttpStatus.OK)
  @Delete('')
  remove(@Query() paramsDto: Record<string, any>) {
    console.log('----------paramsDto----------', paramsDto);
    const { id } = parsePaginate(paramsDto);
    try {
      return this.productService.remove({ id });
    } catch (error) {
      return resJson({ message: error.message });
    }
  }
}
