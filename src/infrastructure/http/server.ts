import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {errorMiddleware} from '../../interface/http/middleware/error';
import {authenticationRouter}
  from '../../interface/http/api/authentication/router';
import {userRouter} from '../../interface/http/api/user/router';

export const initServer = () => {
  const app = express();

  app.get('', function(req, res) {
    res.status(200).json({message: 'Welcome to Assessment Okupasi API'});
  });

  app.use(bodyParser.json(), cookieParser());
  app.use(
      '/api/v1',
      authenticationRouter(),
      userRouter(),
  );
  app.use(errorMiddleware);

  return app;
};
