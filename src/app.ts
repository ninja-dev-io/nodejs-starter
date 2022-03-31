import 'reflect-metadata';
import config from './config';
import server from './core/server';
import container from './core/container';
import TYPES from './core/types';
import { Logger } from './core/logger';
import AWS from './core/aws';

const getPassword = async () => {
  const ssm = new AWS.SSM();
  const options = {
    Name: '/dev/ninjadev/password/master',
    WithDecryption: true,
  };
  const result: AWS.SSM.GetParameterResult = await ssm.getParameter(options).promise();
  console.log(result);
  return result.Parameter;
};

getPassword();

const logger: Logger = container.get<Logger>(TYPES.Logger);

const app = server.listen(config.port, () => logger.instance.info(`Listen on http://localhost:${config.port}/`));

export default app;