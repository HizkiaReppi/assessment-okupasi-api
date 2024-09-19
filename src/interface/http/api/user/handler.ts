import {NextFunction, Request, Response} from 'express';
import {LoginUsecase} from '../../../../application/usecase/user/LoginUsecase';
import {LogoutUsecase}
  from '../../../../application/usecase/user/LogoutUsecase';
import autoBind from 'auto-bind';
import {JwtPayload} from 'jsonwebtoken';
import {Jwt} from '../../../../infrastructure/security/Jwt';
import {ChangeEmailUsecase}
  from '../../../../application/usecase/user/ChangeEmailUsecase';
import {ChangePasswordUsecase}
  from '../../../../application/usecase/user/ChangePasswordUsecase';
import {AddUserUsecase} from '../../../../application/usecase/user/AddUsecase';
import {GetAllUserUsecase}
  from '../../../../application/usecase/user/GetAllUsecase';
import {DeleteUserByIdUsecase}
  from '../../../../application/usecase/user/DeleteByIdUsecase';
import {createAuthCookieOpts} from '../../../../util/auth-cookie';

export class UserHandler {
  constructor(
    private readonly addUserUsecase: AddUserUsecase,
    private readonly getAllUserUsecase: GetAllUserUsecase,
    private readonly deleteUserByIdUsecase: DeleteUserByIdUsecase,
    private readonly loginUsecase: LoginUsecase,
    private readonly logoutUsecase: LogoutUsecase,
    private readonly changeEmailUsecase: ChangeEmailUsecase,
    private readonly changePasswordUsecase: ChangePasswordUsecase,
  ) {
    autoBind(this);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      await this.addUserUsecase.execute(req.body);

      res.status(201).json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.getAllUserUsecase.execute();

      res.json({status: 'success', data});
    } catch (e) {
      next(e);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteUserByIdUsecase.execute(req.params.id);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.loginUsecase.execute(req.body);
      const refreshPayload = await new Jwt()
          .decode(data.refresh.split('Bearer ')[1]) as JwtPayload;

      res.status(201)
          .cookie(
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

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refresh = req.cookies.r.split('Bearer ')[1];
      await this.logoutUsecase.execute(refresh);

      res.status(201).clearCookie('Authorization').json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async changeEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const {id, email} = res.locals.access;
      const newEmail = req.body.email;
      if (newEmail === email) {
        res.json({status: 'success', data: res.locals.access});
      } else {
        await this.changeEmailUsecase.execute({id, email: newEmail});

        res.locals.access.email = newEmail;

        const jwt = new Jwt();
        const accessToken = await jwt.createAccessToken(
            jwt.mapJwtSignPayload(res.locals.access),
        );
        const refreshToken = await jwt.createRefreshToken(
            jwt.mapJwtSignPayload(res.locals.access),
        );
        const refreshPayload = await jwt.decode(refreshToken) as JwtPayload;

        res.cookie(
            'Authorization',
            'Bearer ' + accessToken,
            createAuthCookieOpts(refreshPayload.exp),
        ).cookie(
            'r',
            'Bearer ' + refreshToken,
            createAuthCookieOpts(refreshPayload.exp),
        ).json({
          status: 'success',
          data: {token: accessToken},
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const id = res.locals.access.id;
      const password = req.body.password;
      await this.changePasswordUsecase.execute({id, password});

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }
}
