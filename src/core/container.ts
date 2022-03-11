import { Container } from 'inversify';
import TYPES from './types';
import { Logger } from './logger';
import { Database } from './database';
import '../controllers/users';
import UserService from '../services/users';

const container = new Container();
container.bind(TYPES.Logger).to(Logger).inSingletonScope();
container.bind(TYPES.Database).to(Database).inSingletonScope();
container.bind(TYPES.UserService).to(UserService).inSingletonScope();

export default container;