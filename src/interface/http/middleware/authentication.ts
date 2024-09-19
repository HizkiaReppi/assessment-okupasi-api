import {NextFunction, Request, Response} from 'express';
import {Jwt} from '../../../infrastructure/security/Jwt';
import {verifyAuthorizationCookie} from '../../../util/auth-cookie';
import {AuthenticationError} from '../../../common/error/AuthenticationError';

export const authenticationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  try {
    const {access} = verifyAuthorizationCookie({
      access: req.cookies.Authorization,
      refresh: req.cookies.r,
    });
    access.split('Bearer ')[1];

    const payload = await new Jwt().verifyAccessToken(access);
    res.locals.access = payload;
  } catch (e) {
    next(new AuthenticationError());
  }

  next();
};
