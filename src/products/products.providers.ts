/** @format */

import { DB } from 'utils/constants';
import { Product } from './product.entity';

export const productProviders = [
  {
    provide: DB.PRODUCT_REPOSITORY,
    useValue: Product,
  },
];
