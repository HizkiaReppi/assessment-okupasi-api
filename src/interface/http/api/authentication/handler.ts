import {NextFunction, Request, Response} from 'express';
import {RefreshAuthenticationUsecase}
  from '../../../../application/usecase/authentication/RefreshUsecase';
import autoBind from 'auto-bind';
import {Jwt} from '../../../../infrastructure/security/Jwt';
import {JwtPayload} from 'jsonwebtoken';
import {
  createAuthCookieOpts,
  verifyRefreshCookie,
} from '../../../../util/auth-cookie';

export class AuthenticationHandler {
  constructor(
    private readonly refreshAuthenticationUsecase: RefreshAuthenticationUsecase,
  ) {
    autoBind(this);
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const {refresh} = verifyRefreshCookie({
        refresh: req.cookies.r,
      });

      const data = await this.refreshAuthenticationUsecase.execute(refresh);
      const refreshPayload = await new Jwt()
          .decode(data.refresh.split('Bearer ')[1]) as JwtPayload;

      res.cookie(
          'Authorization',
          data.access,
          createAuthCookieOpts(refreshPayload.exp),
      ).cookie(
          'r',
          data.refresh,
          createAuthCookieOpts(refreshPayload.exp),
      ).json({
        status: 'success',
        data: {token: data.access},
      });
    } catch (e) {
      next(e);
    }
  }
}
