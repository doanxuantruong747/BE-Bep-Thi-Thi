/** @format */

import { DB } from 'utils/constants';
import { Cart } from './cart.entity';

export const cartProviders = [
  {
    provide: DB.CART_REPOSITORY,
    useValue: Cart,
  },
];
