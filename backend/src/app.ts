import cors from 'cors';
import express from 'express';

import appRouter from './routes';
import config from './config/config';
import logger from './utils/logger';
import { defaultError, notFoundHandler } from './controllers/error';

export function init() {
  const app = express();

  app.use(cors({ origin: config.corsWhitelist }));

  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => res.json({ name: config.name, version: config.version }));

  app.use(appRouter);
  app.use(defaultError);
  app.use(notFoundHandler);

  try {
    app.listen(config.port, () => {
      logger.info(`Listening for requests on port: ${config.port}`);
    });
  } catch (error) {
    logger.error(`Error occured: ${error.message}`);

    process.exit(1);
  }
}
