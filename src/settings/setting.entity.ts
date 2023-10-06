/** @format */
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default } from 'sequelize-typescript';

@Table({ tableName: 'settings' })
export class Setting extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Default(new Date())
  @Column
  created_at: Date;

  @Default(new Date())
  @Column
  updated_at: Date;

  @Column
  type: string;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  icon: string;

  @Default(false)
  @Column
  is_delete: boolean;
}
