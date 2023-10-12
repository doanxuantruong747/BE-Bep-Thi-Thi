/** @format */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'users/user.entity';
import {
  genPassword,
  resJson,
  hashRefreshToken,
  compareRefreshToken,
  genRefreshTokenWithTimestamp,
  customAxios,
} from 'utils/libs';
import { UsersService } from '../users/users.service';
import { CheckOtp, Login, craeteUser, updateProfile } from 'types';
import { CreateUserDto } from 'validation/CreateUserDto';
import { LoginDto } from './dto/LoginDto';
//private devicesService: DevicesService,
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  // refresh Token
  // async refreshToken(refreshToken: string): Promise<User | any> {
  //   try {
  //     const inputToken = await hashRefreshToken(refreshToken);
  //     const user = await this.usersService.findByToken(inputToken);
  //     const validRefreshToken = await compareRefreshToken(inputToken, user.token);
  //     if (validRefreshToken) {
  //       const access_token = await this.jwtService.sign({ sub: user.id, email: user.email });
  //       const refresh_token = await genRefreshTokenWithTimestamp();
  //       const newHashedToken = await hashRefreshToken(refresh_token);
  //       user.token = newHashedToken;
  //       await user.save();
  //       return resJson({
  //         message: 'New access token created',
  //         data: [{ access_token, refresh_token }],
  //       });
  //     }
  //     return resJson({ message: 'Token does not match', status: 401 });
  //   } catch (error) {
  //     return resJson({ message: 'Invalid refresh token', status: 401 });
  //   }
  // }

  async register(body: craeteUser) {
    const user = await this.usersService.findOne(body.email);
    if (!user) {
      const hashPassword = await genPassword(body.password);
      body.password = hashPassword;
      const result = await this.usersService.create(body);
      if (result) {
        return resJson({
          message: 'User created successfully!',
        });
      }
    }
    return resJson({ status: 401, message: 'Email or usename has exist!' });
  }

  // login
  async login(signInDto: Login) {
    const { type } = signInDto;
    if (type === 'USER') {
      return await this.loginWithUser(signInDto);
    }
  }

  // login with user
  async loginWithUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOne(email);
    if (user && user.role === 'USER') {
      const match = bcrypt.compareSync(password, user?.password);
      if (match) {
        const payload = { sub: user?.id, email: user?.email };
        return resJson({
          message: 'OK',
          data: [
            {
              access_token: await this.jwtService.signAsync(payload),
            },
          ],
        });
      }
      return resJson({ message: 'Email or password invalid', status: 401 });
    }
    return resJson({ message: 'User NOT exits', status: 401 });
  }
}
