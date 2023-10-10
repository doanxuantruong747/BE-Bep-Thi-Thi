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

  @Default(0)
  @Column
  is_delete: number;
}
