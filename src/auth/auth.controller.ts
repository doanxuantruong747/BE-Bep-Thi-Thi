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
import { CheckOtp, Login, updateProfile } from 'types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Authen')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Login) {
    console.log('signInDto------------', signInDto);
    return this.authService.login(signInDto);
  }

  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@UploadedFile() file, @Body() signUpDto: CreateUserDto) {
    console.log('CreateUserDto', signUpDto, file);
    return this.authService.register(signUpDto);
  }

  @Public()
  @Post('refreshToken')
  async refreshToken(@Body() refreshTokenDto: { refresh_token: string }) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  // Register user
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register-user')
  registerUser(@Body() signUpDto: CreateUserDto) {
    console.log('CreateUserDto', signUpDto);
    try {
      return this.authService.registerUser(signUpDto);
    } catch (error) {
      console.log(error);
    }
  }

  // check OPT register
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('check-otp')
  checkOtp(@Body() body: CheckOtp) {
    console.log('CreateUserDto', body);
    try {
      return this.authService.checkOtp(body);
    } catch (error) {
      console.log(error);
    }
  }

  // request OPT
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('request-opt')
  requestOtp(@Body() body: CheckOtp) {
    console.log('CreateUserDto', body);
    try {
      return this.authService.requestOtp(body);
    } catch (error) {
      console.log(error);
    }
  }

  // forgot-password
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  updatePassByCodeOtp(@Body() body: CheckOtp) {
    console.log('forgot-password', body);
    try {
      return this.authService.updatePassByCodeOtp(body);
    } catch (error) {
      console.log(error);
    }
  }

  // create Pass Code
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('create-passcode')
  createPassCode(@Body() body: updateProfile) {
    console.log('update Profile passcode', body);
    try {
      return this.authService.createPassCode(body);
    } catch (error) {
      console.log(error);
    }
  }

  // Check PassCode
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('check-passcode')
  checkPassCode(@Body() body: updateProfile) {
    console.log('Check passcode', body);
    try {
      return this.authService.checkPassCode(body);
    } catch (error) {
      console.log(error);
    }
  }
}
