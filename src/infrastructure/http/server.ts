import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {errorMiddleware} from '../../interface/http/middleware/error';
import {authenticationRouter}
  from '../../interface/http/api/authentication/router';

export const initServer = () => {
  const app = express();

  app.get('/api/v1', function(req, res) {
    res.status(200).json({message: 'Welcome to Assessment Okupasi API'});
  });

  app.use(bodyParser.json(), cookieParser());
  app.use(
      authenticationRouter(),
  );
  app.use(errorMiddleware);

  return app;
};
