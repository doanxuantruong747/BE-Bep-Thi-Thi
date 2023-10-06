/** @format */

/** @format */

import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { IUserResponse } from 'types';
import { DB } from 'utils/constants';
import { resJson } from 'utils/libs';
import { Product } from './product.entity';

// This should be a real class/interface representing a user entity
@Injectable()
export class NewsService {
  constructor(
    @Inject(DB.PRODUCT_REPOSITORY)
    private newsRepository: typeof Product,
  ) {}

  // create News
  async createNews(body: any): Promise<IUserResponse | any> {
    const { title, content, publishedDate, description, thumbnail } = body;
    const news = await this.newsRepository.findOne({ where: { title: title } });
    if (news) return resJson({ status: 400, message: 'News is exsit' });

    const newNews = new this.newsRepository();
    newNews.title = title;
    newNews.content = content;
    newNews.publishedDate = publishedDate;
    newNews.description = description;
    newNews.thumbnail = thumbnail;

    await newNews.save();
    return resJson({ status: 400, message: 'create success', data: [newNews] });
  }

  // get list All News
  async findAll({ offset, limit = 10, search, page }): Promise<IUserResponse | any> {
    const { count, rows } = await this.newsRepository.findAndCountAll({
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

  // get single News
  async singleNews({ id }): Promise<IUserResponse | any> {
    const news = await this.newsRepository.findOne({
      where: {
        id,
        is_delete: false,
      },
    });
    if (!news) {
      return resJson({ status: 400, message: 'news is not exsit' });
    }
    return resJson({
      message: 'success',
      data: [{ news }],
    });
  }

  // Update News
  async updateNews(body: any): Promise<IUserResponse | any> {
    const { title, content, publishedDate, description, thumbnail, newsId } = body;
    const news = await this.newsRepository.findOne({ where: { id: newsId } });
    if (!news) return resJson({ status: 400, message: 'News is not exsit' });

    news.title = title || news.title;
    news.content = content || news.content;
    news.publishedDate = publishedDate || news.publishedDate;
    news.description = description || news.description;
    news.thumbnail = thumbnail || news.thumbnail;
    await news.save();
    return resJson({ message: 'Update News success', data: [news] });
  }

  // Remove News
  async remove({ id }): Promise<IUserResponse | any> {
    const news = await this.newsRepository.findOne({ where: { id: id } });
    if (!news) return resJson({ status: 400, message: 'News is not exsit' });
    news.is_delete = true;
    await news.save();
    return resJson({ message: 'Remove News success', data: [news] });
  }
}
