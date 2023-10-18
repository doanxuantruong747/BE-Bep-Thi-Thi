/** @format */

import { Product } from 'products/product.entity';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'cart' })
export class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @BelongsTo(() => Product, 'product_id')
  product: Product;

  @Column
  quantity: number;

  @Column
  user_id: number;

  @Column
  is_sale: number;
}
