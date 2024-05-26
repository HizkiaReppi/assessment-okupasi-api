import express from 'express';
import {UserRepositoryImpl}
  from '../../../../infrastructure/repository/UserRepositoryImpl';
import {prismaClient}
  from '../../../../infrastructure/database/prisma';
import {LoginUsecase}
  from '../../../../application/usecase/user/LoginUsecase';
import {AddAuthenticationUsecase}
  from '../../../../application/usecase/authentication/AddUsecase';
import {AuthenticationRepositoryImpl}
  from '../../../../infrastructure/repository/AuthenticationRepositoryImpl';
import {UserHandler} from './handler';
import {LogoutUsecase}
  from '../../../../application/usecase/user/LogoutUsecase';
import {DeleteAuthenticationUsecase}
  from '../../../../application/usecase/authentication/DeleteUsecase';
import {authenticationMiddleware} from '../../middleware/authentication';
import {ChangeEmailUsecase}
  from '../../../../application/usecase/user/ChangeEmailUsecase';
import {ChangePasswordUsecase}
  from '../../../../application/usecase/user/ChangePasswordUsecase';
import {AddUserUsecase} from '../../../../application/usecase/user/AddUsecase';
import {grantSuperMiddleware} from '../../middleware/authorization';

export function userRouter() {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  // repo
  const userRepo = new UserRepositoryImpl(prismaClient);
  const authenticationRepo = new AuthenticationRepositoryImpl(prismaClient);

  // usecase
  const addAuthenticationUsecase =
    new AddAuthenticationUsecase(authenticationRepo);
  const loginUsecase = new LoginUsecase(
      userRepo,
      addAuthenticationUsecase,
  );
  const addUserUsecase = new AddUserUsecase(userRepo);
  const deleteAuthenticationUsecase =
    new DeleteAuthenticationUsecase(authenticationRepo);
  const logoutUsecase = new LogoutUsecase(deleteAuthenticationUsecase);
  const changeEmailUsecase = new ChangeEmailUsecase(userRepo);
  const changePasswordUsecase = new ChangePasswordUsecase(userRepo);

  const handler = new UserHandler(
      addUserUsecase,
      loginUsecase,
      logoutUsecase,
      changeEmailUsecase,
      changePasswordUsecase,
  );

  router.post('/user/login', handler.login);

  // route with login required
  router.post(
      '/user',
      authenticationMiddleware,
      grantSuperMiddleware,
      handler.add,
  );
  router.post('/user/logout', authenticationMiddleware, handler.logout);
  router.patch('/user/email', authenticationMiddleware, handler.changeEmail);
  router.patch(
      '/user/password',
      authenticationMiddleware,
      handler.changePassword,
  );

  return router;
}
