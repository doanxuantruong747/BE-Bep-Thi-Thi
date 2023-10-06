/** @format */

import { DB } from 'utils/constants';
import { User } from './user.entity';

export const usersProviders = [
  {
    provide: DB.USERS_REPOSITORY,
    useValue: User,
  },
];
