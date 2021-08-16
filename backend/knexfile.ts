import * as dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      charset: 'utf8',
      timezone: 'UTC',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'src/db/migrations',
      tableName: 'migrations',
      stub: 'src/db/stubs/migration.stub'
    },
    seeds: {
      directory: 'src/db/seeds',
      stub: 'src/db/stubs/seed.stub'
    }
  },
  test: {
    client: process.env.DB_CLIENT,
    connection: {
      charset: 'utf8',
      timezone: 'UTC',
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_PASSWORD
    },
    migrations: {
      directory: 'src/db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: 'src/db/seeds'
    }
  }
};
