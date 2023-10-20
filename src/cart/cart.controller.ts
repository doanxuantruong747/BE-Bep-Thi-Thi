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
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { parsePaginate, resJson } from 'utils';
import { Public } from 'decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // create a news
  @Public()
  @Post('create')
  async createCart(@Body() body: any) {
    console.log('[body--]', body);
    try {
      return this.cartService.create(body);
    } catch (error) {
      console.log('🚀 ~ file: cart.controller.ts:31 ~ CartController ~ createCart ~ error:', error);
      return resJson({ status: 402, message: error });
    }
  }

  @Public()
  @Get('all')
  findAll(@Query() paramsDto: Record<string, any>) {
    console.log('paramsDto', paramsDto);
    const { offset, limit, search, page, id } = parsePaginate(paramsDto);
    try {
      return this.cartService.findAll({ offset, limit, search, page, id });
    } catch (error) {
      console.log('🚀 ~ file: cart.controller.ts:47 ~ CartController ~ findAll ~ error:', error);
      return resJson({ status: 402, message: error });
    }
  }

  // Update
  @Public()
  @Post('update')
  async updateCart(@Body() body: any) {
    console.log('[---body--]', body);
    try {
      return this.cartService.updateCart(body);
    } catch (error) {
      console.log('🚀 ~ file: cart.controller.ts:60 ~ CartController ~ updateCart ~ error:', error);
      return resJson({ status: 402, message: error });
    }
  }
}
