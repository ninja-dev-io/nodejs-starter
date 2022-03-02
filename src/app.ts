import express, { Application, Router } from 'express';
import config from './config';
import loaders from './loaders';
import api from './api';

async function run() {
  const app: Application = express();
  const router: Router = express.Router();
  const port = config.port;
  loaders(app);
  api(router);
  app.use(router);
  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
}

run()