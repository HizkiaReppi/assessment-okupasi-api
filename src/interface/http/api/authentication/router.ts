import express from 'express';
import {RefreshAuthenticationUsecase}
  from '../../../../application/usecase/authentication/RefreshUsecase';
import {AuthenticationRepositoryImpl}
  from '../../../../infrastructure/repository/AuthenticationRepositoryImpl';
import {prismaClient} from '../../../../infrastructure/database/prisma';
import {AuthenticationHandler} from './handler';
import {GetAuthenticationUsecase}
  from '../../../../application/usecase/authentication/GetUsecase';

export function authenticationRouter() {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  // repo
  const authenticationRepo = new AuthenticationRepositoryImpl(prismaClient);

  // usecase
  const getAuthenticationUsecase =
    new GetAuthenticationUsecase(authenticationRepo);
  const refreshAuthenticationUsecase = new RefreshAuthenticationUsecase(
      authenticationRepo,
      getAuthenticationUsecase,
  );

  const handler = new AuthenticationHandler(refreshAuthenticationUsecase);

  // routes
  router.put(
      '/authentication/refresh',
      handler.refresh,
  );

  return router;
}
