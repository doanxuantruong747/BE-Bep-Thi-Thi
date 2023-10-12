/** @format */

import { Table, Column, Model, PrimaryKey, AutoIncrement, Default } from 'sequelize-typescript';

@Table({ tableName: 'products' })
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @Column
  name: string;

  @Column
  content: string;

  @Column
  images: string;

  @Column
  thumbnail: string;

  @Column
  description: string;

  @Column
  category_id: number;

  @Column
  pirce: number;

  @Column
  pirce_sale: number;

  @Column
  unit: string;

  @Column
  amount: number;

  @Column
  is_delete: number;
}
