import {config} from 'dotenv';
import { DatabaseType } from 'typeorm';

config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};
