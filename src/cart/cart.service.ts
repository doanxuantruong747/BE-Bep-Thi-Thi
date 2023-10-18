/** @format */

import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DB, resJson } from 'utils';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject(DB.CART_REPOSITORY)
    private cartRepository: typeof Cart,
  ) {}

  async create(input: any) {
    const { product_id, quantity, user_id, _id_user } = input;
    const data = { product_id, quantity, user_id, _id_user };
    const cart = await this.cartRepository.create({ data });
    return resJson({ message: 'success' });
  }

  async updateCart(input: any) {
    const { product_id, quantity, is_sale, cart_id } = input;
    const cart = await this.cartRepository.findOne({ where: { id: cart_id } });
    if (!cart) resJson({ message: 'cart not exits' });
    cart.quantity = quantity;
    cart.is_sale = is_sale || cart.is_sale;
    return resJson({ message: 'update success !' });
  }
}
