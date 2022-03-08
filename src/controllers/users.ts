import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../core/types';
import { Logger } from '../core/logger';

@controller('/users')
export class UsersController {

  constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}
  
  @httpGet('/')
  public async get(req: Request, res: Response) {
    return res.send('BORG');
  }
}