import {ResponseError} from './ResponseError';

export class AuthorizationError extends ResponseError {
  constructor(public message = 'anda tidak memiliki akses') {
    super(403, message);
  }
}
