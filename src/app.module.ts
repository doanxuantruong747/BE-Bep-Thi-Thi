/** @format */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from 'products/products.module';
import { EventsSocketModule } from 'socket/eventsSocket.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppServicesModule } from './app_services/app_services.module';
import { AuthModule } from './auth/auth.module';
import config from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';

console.log('AppModule', process.cwd(), process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.${process.env.NODE_ENV || 'staging'}.env`,
      load: [config],
    }),
    ProductModule,
    DatabaseModule,
    AuthModule,
    // MulterModule.registerAsync({
    //   useFactory: () => ({
    //     dest: './upload',
    //   }),
    // }),
    MulterModule.register({
      dest: './public/images/',
    }),
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    // }),
    RolesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/image/(.*)'],
    }),
    EventsSocketModule,
    AppServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
