import {ResponseError} from './ResponseError';

export class BadRequestError extends ResponseError {
  constructor(public message: string) {
    super(400, message);
  }
}
