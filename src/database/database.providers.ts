/** @format */

import 'dotenv/config';
import { Event } from 'events/event.entity';
import { News } from 'products/product.entity';
import { Role } from 'roles/roles.entity';
import { Sequelize } from 'sequelize-typescript';
import { Setting } from 'settings/setting.entity';
import { User } from 'users/user.entity';
import { Device } from 'devices/device.entity';
import { Banner } from 'banner/banner.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        define: {
          timestamps: false,
        },
      });
      sequelize.addModels([User, Role, News, Event, Setting, Device, Banner]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'mysql',
//         driver: 'mysql',
//         host: '127.0.0.1',
//         port: 3306,
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         synchronize: true,
//       });

//       return dataSource.initialize();
//     },
//   },
// ];
