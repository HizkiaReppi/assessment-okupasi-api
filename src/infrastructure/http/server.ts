import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {errorMiddleware} from '../../interface/http/middleware/error';
import {authenticationRouter}
  from '../../interface/http/api/authentication/router';
import {userRouter} from '../../interface/http/api/user/router';
import {okupasiRouter} from '../../interface/http/api/okupasi/router';
import {sekolahRouter} from '../../interface/http/api/sekolah/router';
import {konsentrasiRouter} from '../../interface/http/api/konsentrasi/router';
import {assessmentRouter} from '../../interface/http/api/assessment/router';

export const initServer = () => {
  const app = express();

  app.get('', function(req, res) {
    res.status(200).json({message: 'Welcome to Assessment Okupasi API'});
  });

  app.use(
      cors({
        origin: process.env.ORIGIN,
        credentials: true,
      }),
  );
  app.use(bodyParser.json(), cookieParser());
  app.use(
      '/api/v1',
      authenticationRouter(),
      userRouter(),
      okupasiRouter(),
      sekolahRouter(),
      konsentrasiRouter(),
      assessmentRouter(),
  );
  app.use(errorMiddleware);

  return app;
};
