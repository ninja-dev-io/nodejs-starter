import { injectable } from 'inversify';
import { inject } from 'inversify';
import { Connection, createConnection, ObjectType } from 'typeorm';
import { Logger } from './logger';
import AWS from './aws';
import TYPES from './types';
import config from '../config';
import { User } from '../repositories/users';

@injectable()
export class Database {
  private static connection: Connection;

  public constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

  private async fetchPassword (): Promise<string> {
    const ssm = new AWS.SSM();
    const options = {
      Name: config.password,
      WithDecryption: true,
    };
    const {Parameter: {Value: password}}: AWS.SSM.GetParameterResult = await ssm.getParameter(options).promise();
    return password;
  };

  public async getConnection(): Promise<Connection> {
    try {
      if (Database.connection instanceof Connection) {
        return Database.connection;
      }
      const password: string = config.env === 'local' ? config.password : await this.fetchPassword();
      Database.connection = await createConnection({
        type: 'postgres',
        host: config.host,
        port: 5432,
        username: config.username,
        password: password,
        database: config.database,
        entities: [User]
      });
      this.logger.instance.info('Connection established');
      return Database.connection;
    } catch (e) {
      this.logger.instance.error('Cannot establish database connection');
      process.exit(1);
    }
  }

  public async getRepository<T>(repository: ObjectType<T>): Promise<T> {
    const connection = await this.getConnection();
    return connection.getCustomRepository<T>(repository);
  }
}