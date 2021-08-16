import * as dotenv from 'dotenv';

import * as pkg from '../../package.json';
import { DEFAULT_PORT } from '../constants/server';

dotenv.config();

export default {
  name: pkg.name,
  version: pkg.version,
  port: process.env.APP_PORT || DEFAULT_PORT,
  corsWhitelist: process.env.CORS_WHITELIST?.split(','),
  logging: {
    dir: process.env.LOGGING_DIR || 'logs',
    level: process.env.LOGGING_LEVEL || 'debug',
    maxSize: process.env.LOGGING_MAX_SIZE || '20m',
    maxFiles: process.env.LOGGING_MAX_FILES || '7d',
    datePattern: process.env.LOGGING_DATE_PATTERN || 'YYYY-MM-DD'
  },
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      charset: 'utf8',
      timezone: 'UTC',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  }
};
