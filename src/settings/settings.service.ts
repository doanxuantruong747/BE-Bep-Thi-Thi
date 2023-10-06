/** @format */
import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { IUserResponse } from 'types';
import { DB } from 'utils/constants';
import { resJson } from 'utils/libs';
import { Setting } from './setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(DB.SETTINGS_REPOSITORY)
    private settingsRepository: typeof Setting,
  ) {}

  // create a new setting
  async create(body: any): Promise<IUserResponse | any> {
    const { type, title, content, icon } = body;
    const setting = await this.settingsRepository.findOne({
      where: { title: title },
    });
    if (setting) return resJson({ status: 400, message: 'title setting is exsit' });
    //if (setting.type === 'AboutUs') return resJson({ status: 400, message: 'AboutUs is exsit' });

    const newSeting = new this.settingsRepository();
    newSeting.title = title;
    newSeting.content = content;
    newSeting.type = type;
    newSeting.icon = icon;

    await newSeting.save();
    return resJson({ status: 400, message: 'create new setting success', data: [newSeting] });
  }

  // get list All Settings
  async findAll({ offset, limit = 10, search, page }): Promise<IUserResponse | any> {
    const { count, rows } = await this.settingsRepository.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
        is_delete: false,
      },
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });
    const totalPage = Math.ceil(count / limit);
    return resJson({
      message: 'success',
      data: [{ items: rows }, { totalItem: count, page, totalPage }],
    });
  }

  // get list about us Settings
  async findAboutUs({ offset, limit = 10, search, page }): Promise<IUserResponse | any> {
    const { count, rows } = await this.settingsRepository.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
        type: 'AboutUs',
        is_delete: false,
      },
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });
    const totalPage = Math.ceil(count / limit);
    return resJson({
      message: 'success',
      data: [{ items: rows }, { totalItem: count, page, totalPage }],
    });
  }

  // get list about us Settings
  async findPolicyPasscode({ offset, limit = 10, search, page }): Promise<IUserResponse | any> {
    const { count, rows } = await this.settingsRepository.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
        type: 'PolicyPasscode',
        is_delete: false,
      },
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });
    const totalPage = Math.ceil(count / limit);
    return resJson({
      message: 'success',
      data: [{ items: rows }, { totalItem: count, page, totalPage }],
    });
  }

  // get list about us Settings
  async findConditions({ offset, limit = 10, search, page }): Promise<IUserResponse | any> {
    const { count, rows } = await this.settingsRepository.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
        type: 'Conditions',
        is_delete: false,
      },
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });
    const totalPage = Math.ceil(count / limit);
    return resJson({
      message: 'success',
      data: [{ items: rows }, { totalItem: count, page, totalPage }],
    });
  }

  // Update a new Setting
  async updateSetting(body: any): Promise<IUserResponse | any> {
    const { type, title, content, icon, settingId } = body;
    const setting = await this.settingsRepository.findOne({ where: { id: settingId } });
    if (!setting) return resJson({ status: 400, message: 'Setting is not exsit' });

    setting.title = title || setting.title;
    setting.content = content || setting.content;
    setting.type = type || setting.type;
    setting.icon = icon || setting.icon;
    await setting.save();
    return resJson({ status: 400, message: 'Update Setting success', data: [setting] });
  }

  // Remove News
  async remove({ id }): Promise<IUserResponse | any> {
    const setting = await this.settingsRepository.findOne({ where: { id: id } });
    if (!setting) return resJson({ status: 400, message: 'setting is not exsit' });
    setting.is_delete = true;
    await setting.save();
    return resJson({ status: 400, message: 'Remove setting success', data: [setting] });
  }
}
