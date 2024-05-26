import {NextFunction, Request, Response} from 'express';
import {AuthorizationError} from '../../../common/error/AuthorizationError';

export const grantSuperMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  if (!res.locals.access.is_super) {
    next(new AuthorizationError());
  }

  next();
};
