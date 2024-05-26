import {ResponseError} from './ResponseError';

export class NotFoundError extends ResponseError {
  constructor(public message: string) {
    super(404, message);
  }
}
