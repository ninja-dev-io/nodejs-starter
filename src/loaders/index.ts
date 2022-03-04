import { Application } from 'express';
import { logger } from '../common/logger';
import expressLoader from './express';

export default (app: Application) => {
  expressLoader(app);
  logger.info('Express Initialized');
}