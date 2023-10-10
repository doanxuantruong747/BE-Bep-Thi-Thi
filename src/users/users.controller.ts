/** @format */

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFilename, parsePaginate } from 'utils/libs';
import { UpdateUserDto } from 'validation/UpdateUserDto';
import { UsersService } from './users.service';
import { Public } from 'decorators/public.decorator';
import { craeteUser } from 'types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('Accounts')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @HttpCode(HttpStatus.OK)
  // @Get('all')
  // findAll(@Query() paramsDto: Record<string, any>) {
  //   console.log('paramsDto', paramsDto);
  //   const { offset, limit } = parsePaginate(paramsDto);

  //   return this.usersService.findAll({
  //     offset,
  //     limit,
  //   });
  // }

  // @Get('profile')
  // profile(@Request() req) {
  //   return this.usersService.profile(req.user.email);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Put()
  // @UseInterceptors(
  //   FileInterceptor('avatar', {
  //     storage: diskStorage({
  //       destination: './public/avatar/',
  //       filename: (req, file, cb) => generateFilename(req, file, cb),
  //     }),
  //   }),
  // )
  // async update(@UploadedFile() avatar, @Body() req: UpdateUserDto) {
  //   console.log('[file--]', avatar, req);
  //   if (avatar?.['filename']) {
  //     req.avatar = avatar['filename'];
  //   }
  //   return this.usersService.update(req);
  // }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('/create')
  // async createUser(@Body() req: craeteUser) {
  //   const { email, name, userId, avatar } = req;
  //   if (avatar?.['filename']) {
  //     req.avatar = avatar['filename'];
  //   }
  //   return this.usersService.createUser(email, avatar, name, userId);
  // }
}
