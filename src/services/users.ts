import { injectable, inject } from 'inversify';
import { Database } from '../core/database';
import TYPES from '../core/types';
import { UserRepository } from '../repositories/users';

@injectable()
export default class {

  constructor(@inject(TYPES.Database) private readonly database: Database) {}
  
  public async getUsers() {
    const userRepository = await this.database.getRepository(UserRepository);
    const users = await userRepository.find();
    return users;
  }
}