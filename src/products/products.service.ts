/** @format */

import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { IUserResponse } from 'types';
import { DB } from 'utils/constants';
import { resJson } from 'utils/libs';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(DB.PRODUCT_REPOSITORY)
    private productRepository: typeof Product,
  ) {}

  // create Product
  async createProduct(images: any, body: any) {
    const { name, content, description, category_id, pirce, pirce_sale, unit, amount } = body;
    const arrayImages = [];
    if (images.length > 0) {
      for (const item of images) {
        arrayImages.push(item?.filename);
      }
    }
    const product = await this.productRepository.findOne({ where: { name: name } });
    if (product) return resJson({ status: 400, message: 'Name Product is exsit' });
    const newProduct = new this.productRepository();
    newProduct.name = name;
    newProduct.content = content;
    newProduct.images = JSON.stringify(arrayImages);
    newProduct.description = description;
    newProduct.thumbnail = `${arrayImages[0]}`;
    newProduct.category_id = category_id;
    newProduct.pirce = pirce;
    newProduct.pirce_sale = pirce_sale;
    newProduct.unit = unit;
    newProduct.amount = amount;

    await newProduct.save();
    return resJson({ message: 'create success', data: [newProduct] });
  }

  // get list All News
  async findAll({ offset, limit = 10, search, page }): Promise<IUserResponse | any> {
    const { count, rows } = await this.productRepository.findAndCountAll({
      where: {
        name: {
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

  // get single Products
  async singleProduct({ id }): Promise<IUserResponse | any> {
    const product = await this.productRepository.findOne({
      where: {
        id,
        is_delete: false,
      },
    });
    if (!product) {
      return resJson({ status: 400, message: 'product is not exsit' });
    }
    return resJson({
      message: 'success',
      data: [product],
    });
  }

  // Update Product
  async updateProduct(images: any, body: any): Promise<IUserResponse | any> {
    const { name, content, description, category_id, price, pirce_sale, unit, amount, product_id } =
      body;
    const product = await this.productRepository.findOne({ where: { id: product_id } });
    if (!product) return resJson({ status: 400, message: 'product is not exsit' });

    const arrayImages = [];
    if (images.length > 0) {
      for (const item of images) {
        arrayImages.push(item?.filename);
      }
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.pirce = price || product.pirce;
    product.content = content || product.content;
    product.category_id = category_id || product.category_id;
    product.pirce_sale = pirce_sale || product.pirce_sale;
    product.unit = unit || product.unit;
    product.amount = amount || product.amount;
    product.images = JSON.stringify(arrayImages) || product.images;
    await product.save();
    return resJson({ message: 'Update product success', data: [product] });
  }

  // Remove product
  async remove({ id }): Promise<IUserResponse | any> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) return resJson({ status: 400, message: 'product is not exsit' });
    product.is_delete = 1;
    await product.save();
    return resJson({ message: 'Remove product success', data: [product] });
  }
}
