import {ResponseError} from './ResponseError';

export class AuthenticationError extends ResponseError {
  constructor(public message = 'sesi kadaluarsa, silahkan login kembali') {
    super(401, message);
  }
}
