/** @format */

import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({ tableName: 'roles' })
export class Role extends Model {
  @ForeignKey(() => User)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  slug_name: string;
}
