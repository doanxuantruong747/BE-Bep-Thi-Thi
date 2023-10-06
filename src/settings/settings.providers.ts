/** @format */

import { DB } from 'utils/constants';
import { Setting } from './setting.entity';

export const SettingsProviders = [
  {
    provide: DB.SETTINGS_REPOSITORY,
    useValue: Setting,
  },
];
