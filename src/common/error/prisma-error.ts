import {Prisma} from '@prisma/client';
import {BadRequestError} from './BadRequestError';

export function isPrismaError(e: any) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') {
      throw new BadRequestError(`${e.meta?.target} is already exist`);
    }
  }
}
