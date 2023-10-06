/** @format */

import { Module } from '@nestjs/common';
import { NewsService } from './products.service';
import { NewsController } from './products.controller';
import { DatabaseModule } from 'database/database.module';
import { productProviders } from './products.providers';

@Module({
  imports: [DatabaseModule],
  providers: [NewsService, ...productProviders],
  exports: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
