import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {errorMiddleware} from '../../interface/http/middleware/error';

export const initServer = () => {
  const app = express();

  app.get('/api/v1', function(req, res) {
    res.status(200).json({message: 'Welcome to Assessment Okupasi API'});
  });

  app.use(bodyParser.json(), cookieParser());

  app.use(errorMiddleware);

  return app;
};
