import {NextFunction, Request, Response} from 'express';
import {ResponseError} from '../../../common/error/response-error';
import {ZodError} from 'zod';

export const errorMiddleware = async (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
  if (error) {
    let status: number;
    let message: any[];

    if (error instanceof ResponseError) {
      status = error.status;
      message = [{message: error.message}];
    } else if (error instanceof ZodError) {
      status = 400;
      message = JSON.parse(error.message);
    } else {
      status = 500;
      message = [{message: 'Internal Server Error'}];
    }

    res.status(status).json({errors: message});
  }
};
