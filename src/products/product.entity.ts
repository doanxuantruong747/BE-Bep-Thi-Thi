/** @format */

import { Table, Column, Model, PrimaryKey, AutoIncrement, Default } from 'sequelize-typescript';

@Table({ tableName: 'products' })
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  //@Default(new Date())
  @Column
  created_at: Date;

  //@Default(new Date())
  @Column
  updated_at: Date;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  publishedDate: Date;

  @Column
  thumbnail: string;

  @Column
  description: string;

  @Default(false)
  @Column
  is_delete: boolean;
}
