import { Application } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

export default (app: Application) => {
  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  return app;
}