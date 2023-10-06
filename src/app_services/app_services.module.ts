/** @format */

import { Module } from '@nestjs/common';
import { AppServicesController } from './app_services.controller';
import { AppServicesService } from './app_services.service';

@Module({
  controllers: [AppServicesController],
  providers: [AppServicesService],
})
export class AppServicesModule {}
