/** @format */

import { Cart } from 'cart/cart.entity';
import 'dotenv/config';
import { Order } from 'order/order.entity';

import { Product } from 'products/product.entity';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'users/user.entity';

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
      sequelize.addModels([User, Product, Cart, Order]);
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
