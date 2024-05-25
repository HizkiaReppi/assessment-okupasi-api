import {ResponseError} from './ResponseError';

export class InternalServerError extends ResponseError {
  constructor(public message = 'Internal Server Error') {
    super(500, message);
  }
}
