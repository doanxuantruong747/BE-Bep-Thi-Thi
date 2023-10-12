/** @format */

import { Role } from 'roles/roles.entity';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  userName: string;

  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @Default(new Date())
  @Column
  created_at: Date;

  @Default(new Date())
  @Column
  updated_at: Date;

  @Default(true)
  @Column
  is_active: boolean;

  @Column
  active_code: string;

  @Default('')
  @Column
  avatar: string;

  @Default('')
  @Column
  fcm_token: string;

  @Default('')
  @Column
  accessToken: string;

  @Column
  finger: string;

  @Column
  passcode: string;

  @Column
  role: string;

  @Column
  is_delete: number;
}
