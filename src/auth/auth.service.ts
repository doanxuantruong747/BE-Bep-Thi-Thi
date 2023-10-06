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
import { CheckOtp, Login, updateProfile } from 'types';
import { CreateUserDto } from 'validation/CreateUserDto';
import { DevicesService } from 'devices/devices.service';
//private devicesService: DevicesService,
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private devicesService: DevicesService,
  ) {}

  // refresh Token
  async refreshToken(refreshToken: string): Promise<User | any> {
    try {
      const inputToken = await hashRefreshToken(refreshToken);
      const user = await this.usersService.findByToken(inputToken);
      const validRefreshToken = await compareRefreshToken(inputToken, user.token);
      if (validRefreshToken) {
        const access_token = await this.jwtService.sign({ sub: user.id, email: user.email });
        const refresh_token = await genRefreshTokenWithTimestamp();
        const newHashedToken = await hashRefreshToken(refresh_token);
        user.token = newHashedToken;
        await user.save();
        return resJson({
          message: 'New access token created',
          data: [{ access_token, refresh_token }],
        });
      }
      return resJson({ message: 'Token does not match', status: 401 });
    } catch (error) {
      return resJson({ message: 'Invalid refresh token', status: 401 });
    }
  }

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const match = bcrypt.compareSync(password, user?.password);
      if (match) {
        const payload = { sub: user?.id, email: user?.email };
        const refresh_token = await genRefreshTokenWithTimestamp();
        const hashed_refresh_token = await hashRefreshToken(refresh_token);
        user.accessToken = hashed_refresh_token;
        await user.save();
        return resJson({
          message: 'OK',
          data: [
            {
              role: user?.role?.slug_name,
              access_token: await this.jwtService.signAsync(payload),
              refresh_token,
            },
          ],
        });
      }
      return resJson({ message: 'Email or password invalid', status: 401 }); // throw new UnauthorizedException();
    }
    return resJson({ message: 'Email or password invalid', status: 401 }); // throw new UnauthorizedException();
  }

  async register(paramsDto): Promise<User | any> {
    const user = await this.usersService.findOne(paramsDto.email);
    if (!user) {
      const hashPassword = await genPassword(paramsDto.password);
      paramsDto.password = hashPassword;
      const result = await this.usersService.create(paramsDto);
      if (result) {
        return resJson({
          // data: [result],
          message: 'User has been created!',
        });
      }
    }
    return resJson({ status: 401, message: 'Email or usename has exist!' }); // throw new UnauthorizedException();
  }

  // login
  async login(signInDto: Login) {
    const { email, password, type } = signInDto;
    if (type === 'ADMIN') {
      return await this.loginWithAdmin(email, password);
    }
    if (type === 'USER') {
      return await this.loginWithUser(signInDto);
    }
    if (type === 'GOOGLE') {
      return await this.loginGoogle(signInDto);
    }
  }

  // login with admin
  async loginWithAdmin(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    console.log(user);
    if (user) {
      const match = bcrypt.compareSync(password, user?.password);
      if (match) {
        const payload = { sub: user?.id, email: user?.email };
        const refresh_token = await genRefreshTokenWithTimestamp();
        const hashed_refresh_token = await hashRefreshToken(refresh_token);
        user.accessToken = hashed_refresh_token;
        await user.save();
        return resJson({
          message: 'OK',
          data: [
            {
              role: user?.role?.slug_name,
              access_token: await this.jwtService.signAsync(payload),
              refresh_token,
            },
          ],
        });
      }
      return resJson({ message: 'Email or password invalid', status: 401 }); // throw new UnauthorizedException();
    }
    return resJson({ message: 'Email or password invalid', status: 401 }); // throw new UnauthorizedException();
  }

  // login with user
  async loginWithUser(signInDto: any) {
    const { type, email, password, device_name, device_id, platform, ip_address, login_at } =
      signInDto;
    const data = {
      email: email,
      password: password,
      type,
    };

    const token = '';
    const path = '/auth/login';
    const method = 'POST';
    const response = await customAxios(method, path, token, data);
    console.log('response----------', response);

    if (response.success === false)
      return resJson({
        message: response.message,
        status: 402,
      });
    if (response && response.data) {
      const token = response.data[0].access_token;
      if (token) {
        const user = await this.usersService.getProfileUser(token);
        console.log('user------------------', user);
        const user_id = user.id;
        const userData = await this.usersService.findOne(user.email);
        if (!userData) {
          await this.usersService.createUser(user?.email, user?.avatar, user?.name, user_id);
        }
        //create device user
        const dtoCreateDevice = {
          device_name,
          device_id,
          platform,
          ip_address,
          login_at,
          user_id,
        };
        const checkDevice = await this.devicesService.checkDevice(dtoCreateDevice);

        if (checkDevice === true) {
          return resJson({
            data: [{ access_token: token }, user.email_verified_at],
            message: 'login success',
            status: 200,
          });
        }
        return resJson({ message: 'fail device', status: 401 });
      }
    }
    return resJson({ message: 'Email or password invalid', status: 401 }); // throw new UnauthorizedException();
  }

  // Login With google
  async loginGoogle(loginDto: any) {
    const { device_name, device_id, platform, ip_address, login_at } = loginDto;
    // const data = {
    //   idToken,
    //   type,
    // };
    const token = '';
    const path = '/auth/login';
    const method = 'POST';
    const response = await customAxios(method, path, token, loginDto);
    //console.log('-------Login Google--------', response);

    if (response && response?.success === true) {
      const access_token = response.data[0].access_token;
      const user = await this.usersService.getProfileUser(access_token);
      console.log('user------------------', user);
      const user_id = user.id;
      const userData = await this.usersService.findOne(user.email);
      if (!userData) {
        await this.usersService.createUser(user?.email, user?.avatar, user?.name, user_id);
      }
      //create device user
      const dtoCreateDevice = {
        device_name,
        device_id,
        platform,
        ip_address,
        login_at,
        user_id,
      };
      const checkDevice = await this.devicesService.checkDevice(dtoCreateDevice);
      if (checkDevice === true) {
        return resJson({
          data: [response?.data[0]],
          message: 'Login Google successfully',
          status: 200,
        });
      }
    }
    return resJson({ message: 'Login Google please try again', status: 401 }); // throw new UnauthorizedException();
  }

  // register user client
  async registerUser(signUpDto: CreateUserDto) {
    const { email, password, name } = signUpDto;
    const data = {
      email,
      password,
      name,
    };
    const token = '';
    const path = '/auth/register';
    const method = 'POST';
    const response = await customAxios(method, path, token, data);
    console.log('response----', response);

    if (response && response?.success === true) {
      return resJson({
        message: 'The otp code will be sent to your email',
        status: 200,
      });
    }

    return resJson({
      message: 'Registration failed or Email exits ! please try again',
      status: 401,
    });
  }

  // check OTP
  async checkOtp(body: CheckOtp) {
    const { otp_code, request_type } = body;
    const data = {
      otp_code,
      request_type,
    };
    const token = '';
    const path = '/auth/check-otp';
    const method = 'POST';
    const response = await customAxios(method, path, token, data);
    console.log('-------Check OTP--------', response);

    if (response && response?.success === true) {
      return resJson({
        data: [{ code_change: response.data[0]?.code_change }],
        message: 'verify opt successfully',
        status: 200,
      });
    }
    return resJson({ message: response.message, status: 401 }); // throw new UnauthorizedException();
  }

  // Request OTP
  async requestOtp(body: CheckOtp) {
    const { email, request_type } = body;
    const data = {
      email,
      request_type,
    };
    const token = '';
    const path = '/auth/request-otp';
    const method = 'POST';
    const response = await customAxios(method, path, token, data);
    console.log('-------Request OTP--------', response);

    if (response && response?.success === true) {
      return resJson({
        message: 'The otp code will be sent to your email',
        status: 200,
      });
    }
    return resJson({ message: 'Request OTP failed please try again', status: 401 }); // throw new UnauthorizedException();
  }

  // Chage Password by code OTP
  async updatePassByCodeOtp(body: CheckOtp) {
    const { email, password, code_change } = body;
    const data = {
      email,
      code_change,
      password,
    };
    const token = '';
    const path = '/auth/update-password';
    const method = 'POST';
    const response = await customAxios(method, path, token, data);
    console.log('-------Chage Password--------', response);

    if (response && response?.success === true) {
      return resJson({
        message: 'Chage Password successfully',
        status: 200,
      });
    }
    return resJson({ message: 'Request OPT failed please try again', status: 401 }); // throw new UnauthorizedException();
  }

  // Create PassCode
  async createPassCode(body: updateProfile) {
    const { passcode, access_token } = body;
    const data = {
      passcode,
    };
    const token = access_token;
    const path = '/auth/update-profile';
    const method = 'POST';
    const response = await customAxios(method, path, token, data);

    if (response && response?.success === true) {
      console.log('-------update passcode--------', response);
      const user = await this.usersService.getProfileUser(access_token);
      const email = user.email;
      if (user) {
        await this.usersService.updateProfileUser(passcode, email);
      }
      return resJson({
        message: 'Update passcode successfully',
        status: 200,
      });
    }
    return resJson({ message: 'Request passcode failed please try again', status: 401 }); // throw new UnauthorizedException();
  }

  // Check passcode by code OTP
  async checkPassCode(body: updateProfile) {
    const { passcode, access_token } = body;
    const user = await this.usersService.getProfileUser(access_token);
    //console.log(' ------check user passCode---', user);
    console.log(' ------user.data[0].passcode---', user);

    if (user.passcode === passcode) {
      return resJson({
        data: [user],
        message: 'Passcode successfully',
        status: 200,
      });
    }
    return resJson({
      message: 'Passcode failed',
      status: 400,
    });
  }
}
