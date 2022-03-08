import { InversifyExpressServer } from 'inversify-express-utils';
import { Logger } from './logger';
import container from './container';
import TYPES from './types';
import cors from 'cors';
import * as bodyParser from 'body-parser';

const server = new InversifyExpressServer(container);
const logger: Logger = container.get<Logger>(TYPES.Logger);

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger.middleware);
  app.enable('trust proxy');
  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
});

export default server;

