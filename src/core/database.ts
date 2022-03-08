import { injectable } from 'inversify';
import { inject } from 'inversify';
import { Connection, createConnection, ObjectType } from 'typeorm';
import TYPES from './types';
import { Logger } from './logger';

@injectable()
export class Database {
  private static connection: Connection;

  public constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

  public async getConnection(): Promise<Connection> {
    try {
      Database.connection = await createConnection();
      this.logger.instance.info('Connection established');
      return Database.connection;
    } catch (e) {
      this.logger.instance.error('Cannot establish database connection');
      process.exit(1);
    }
  }

  public async getRepository<T>(repository: ObjectType<T>): Promise<T> {
    const connection = await this.getConnection();
    return await connection.getCustomRepository<T>(repository);
  }
}