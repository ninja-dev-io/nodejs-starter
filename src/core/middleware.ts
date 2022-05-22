import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import config from '../config';
import { BadRequestError, BaseError, ForbiddenError, NotAuthorizedError, ServerError } from './exceptions';

interface IntrospectResponse {
  active: boolean;
  sub: string;
  iss: string;
  iat: string;
  jti: string;
  exp: number;
  username: string;
  scope: string;
}

export const authorize: (scope: string[]) => (req: Request, res: Response, next: NextFunction) => void = (permissions: string[]) => {
  return async (req, res, next) => { 
    const token = req.headers['Authorization'];
    if (!token) return next(new BadRequestError('auth token is missing'));
    try {
      const { data } = await axios.post<IntrospectResponse>(
        config.auth_api,
        {token},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      const scope = data.scope.split(' ');
      const hasAccess: boolean = permissions.some(permission => scope.some(scope => permission === scope)); 
      if (!hasAccess) return next(new ForbiddenError());
    } catch (error) {
      return next(new NotAuthorizedError());
    }
    next();
  };
};

export const errorHandler: (err: TypeError | BaseError, req: Request, res: Response, next: NextFunction) => void = (err, req, res, next) => { 
  let error = err;
  if (!(err instanceof BaseError)) {
    error = new ServerError();
  }
  res.status((error as BaseError).status).send(error.message);
};
 
