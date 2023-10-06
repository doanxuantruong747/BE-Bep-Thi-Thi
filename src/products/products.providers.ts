/** @format */

import { DB } from 'utils/constants';
import { Product } from './product.entity';

export const productProviders = [
  {
    provide: DB.DATA_SOURCE,
    useValue: Product,
  },
];
