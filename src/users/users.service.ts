/** @format */

import { Inject, Injectable } from '@nestjs/common';
import { unlink } from 'fs';
import { Op } from 'sequelize';
import { IUserResponse } from 'types';
import { DB } from 'utils/constants';
import { customAxios, resJson } from 'utils/libs';
import { User } from './user.entity';
import { RoleUser } from 'types/role';

// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  constructor(
    @Inject(DB.USERS_REPOSITORY)
    private usersRepository: typeof User,
  ) {}

  async findAll({ offset, limit = 10 }): Promise<IUserResponse> {
    const users = await this.usersRepository.findAndCountAll({
      attributes: ['id', 'name', 'email', 'role'],
      offset,
      limit,
    });
    return resJson({ data: [users] });
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      attributes: ['id', 'email', 'password', 'role'],
      where: { email },
    });
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async create({ email, password, name }): Promise<IUserResponse> {
    const newUser = {
      email,
      password,
      name,
      role: RoleUser.ADMIN,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const user = await this.usersRepository.create(newUser);
    return resJson({ data: [user] });
  }

  async createUser({ email, password, name }): Promise<IUserResponse> {
    const newUser = {
      email,
      password,
      name,
      role: RoleUser.USER,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const user = await this.usersRepository.create(newUser);
    return resJson({ data: [user] });
  }

  async profile(email: string): Promise<User | any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return resJson({
        message: 'User found!',
        data: [user],
      });
    }
    return resJson({ status: 400, message: 'User not found' }); // throw new UnauthorizedException();
  }

  async update(userData): Promise<User | any> {
    const user = await this.findById(userData.id);
    if (user) {
      if (user.avatar !== userData.avatar) {
        unlink(`./public/avatar/${user.avatar}`, err => {
          console.log(err);
        });
      }
      for (const k in userData) {
        if (userData.hasOwnProperty(k)) {
          if (!['email', 'id'].includes(k)) {
            user[k] = userData[k];
          }
        }
      }
      user.updated_at = new Date();
      const userUpdated = await user.save();
      return resJson({ message: 'User has been updated!', data: [userUpdated] }); // throw new UnauthorizedException();
    }
    return resJson({ status: 400, message: 'User not found' }); // throw new UnauthorizedException();
  }

  async findByToken(token: string): Promise<User | any> {
    return this.usersRepository.findOne({ where: { token } });
  }

  // get Profile User
  async getProfileUser(token: string) {
    const data = '';
    const path = '/user/me';
    const method = 'GET';
    const response = await customAxios(method, path, token, data);
    return response.data[0];
  }

  // create user
  // async createUser(
  //   email: string,
  //   avatar: string,
  //   name: string,
  //   userId: string,
  // ): Promise<IUserResponse | any> {
  //   const user = await this.usersRepository.findOne({ where: { email: email } });
  //   const idUser = String(userId);
  //   console.log('idUser--------', typeof idUser);

  //   if (!user) {
  //     const newUser = new this.usersRepository();
  //     newUser.userName = name || 'USER';
  //     newUser.name = name || 'USER';
  //     newUser.email = email;
  //     newUser.role_id = 3;
  //     newUser.userId = idUser;
  //     newUser.avatar = avatar || '';
  //     newUser.password = '';
  //     newUser.accessToken = '';
  //     newUser.fcm_token = '';
  //     return await newUser.save();
  //   }
  //   return { message: 'This email has been registered!' };
  // }

  // update Profile User
  async updateProfileUser(passcode: string, email: string): Promise<IUserResponse | any> {
    const user = await this.usersRepository.findOne({ where: { email: email } });
    if (user) {
      return await user.save();
    }
  }
}
