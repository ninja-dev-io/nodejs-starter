import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Logger } from '../core/logger';
import { authorize } from '../core/middleware';
import TYPES from '../core/types';
import UserService from '../services/users';

@controller('/users')
export class UsersController {

  constructor(@inject(TYPES.UserService) private readonly userService: UserService, @inject(TYPES.Logger) private readonly logger: Logger) {}

  @httpGet('/')
  public async get(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    return res.json(users);
  }
}