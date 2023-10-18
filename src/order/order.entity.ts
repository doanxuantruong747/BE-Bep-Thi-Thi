/** @format */

import { Cart } from 'cart/cart.entity';
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
import { User } from 'users/user.entity';

@Table({ tableName: 'order' })
export class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @Column
  products: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @Column
  address: string;

  @Column
  phone_number: number;

  @Column
  total_bill: number;

  @Column
  status: string;

  @Column
  is_delete: number;
}
