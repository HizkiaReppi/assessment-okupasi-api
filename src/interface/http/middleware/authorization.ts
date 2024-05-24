import {NextFunction, Request, Response} from 'express';
import {AuthorizationError} from '../../../common/error/AuthorizationError';

export const authorizationMiddleware = (roles: string[]) => {
  return async (
      req: Request,
      res: Response,
      next: NextFunction,
  ) => {
    if (!roles.includes(res.locals.access.role)) {
      next(new AuthorizationError());
    }

    next();
  };
};
