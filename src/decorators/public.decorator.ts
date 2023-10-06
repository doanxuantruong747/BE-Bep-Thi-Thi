/** @format */
import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.${process.env.NODE_ENV || 'staging'}.env` });

export const IS_PUBLIC_KEY = `${process.env.IS_PUBLIC_KEY || 'IS_PUBLIC_KEY'}`;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
