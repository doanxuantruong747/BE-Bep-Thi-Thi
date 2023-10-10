/** @format */

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { ProductController } from './products.controller';
import { productProviders } from './products.providers';
import { ProductService } from './products.service';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService, ...productProviders],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
