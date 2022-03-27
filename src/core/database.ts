import { injectable } from 'inversify';
import { inject } from 'inversify';
import { Connection, createConnection, ObjectType } from 'typeorm';
import { Logger } from './logger';
import TYPES from './types';
import config from '../config';
import { User } from '../repositories/users';

@injectable()
export class Database {
  private static connection: Connection;

  public constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

  public async getConnection(): Promise<Connection> {
    try {
      if (Database.connection instanceof Connection) {
        return Database.connection;
      }
      Database.connection = await createConnection({
        type: 'postgres',
        host: config.host,
        port: 5432,
        username: config.username,
        password: config.password,
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