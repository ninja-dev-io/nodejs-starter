import {config} from 'dotenv';

config();

export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV
};