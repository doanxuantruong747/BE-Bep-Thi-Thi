/** @format */

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'validation/CreateUserDto';
import { Public } from '../decorators/public.decorator';
import { AuthService } from './auth.service';
import { CheckOtp, Login, craeteUser, updateProfile } from 'types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/LoginDto';
import { generateFilename, resJson } from 'utils';
import { diskStorage } from 'multer';

@ApiBearerAuth()
@ApiTags('Authen')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Login
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Login) {
    console.log('-----------signInDto------', signInDto);
    return this.authService.login(signInDto);
  }

  //Register user
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/avatar/',
        filename: (req, file, cb) => generateFilename(req, file, cb),
      }),
    }),
  )
  register(@UploadedFile() avatar, @Body() body: craeteUser) {
    try {
      console.log('CreateUserDto', body, avatar);
      if (avatar?.['filename']) {
        body.avatar = avatar['filename'];
      }
      return this.authService.register(body);
    } catch (error) {
      return resJson({ status: 401, message: error.message });
    }
  }
}
