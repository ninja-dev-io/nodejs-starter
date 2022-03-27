import 'reflect-metadata';
import 'mocha';
import { expect } from 'chai';
import container from '../../src/core/container';
import TYPES from '../../src/core/types';
import UserService from '../../src/services/users';

const userService: UserService = container.get<UserService>(TYPES.UserService);
 
describe('Users test', () => {
 
  it('should return users', async () => {
    const users = await userService.getUsers();
    expect(users).length.greaterThan(0);
  });
});