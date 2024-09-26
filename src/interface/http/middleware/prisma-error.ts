import {Prisma} from '@prisma/client';
import {BadRequestError} from '../../../common/error/BadRequestError';
import {NextFunction, Request, Response} from 'express';

export async function prismaErrorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
  if (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        next(new BadRequestError(`${error.meta?.target} is already exist`));
      }
    }
  }

  next();
}
