/** @format */

import { DB } from 'utils/constants';
import { Order } from './order.entity';

export const orderProviders = [
  {
    provide: DB.ORDER_REPOSITORY,
    useValue: Order,
  },
];
