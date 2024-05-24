import bcrypt from 'bcrypt';
import {AuthenticationError} from '../../common/error/AuthenticationError';

export class Bcrypt {
  constructor(private readonly saltRound = 10) {}

  async hash(password: string) {
    return bcrypt.hash(password, this.saltRound);
  }

  async compare(password: string, hashedPassword: string) {
    const res = await bcrypt.compare(password, hashedPassword);
    if (!res) {
      throw new AuthenticationError('email atau password salah');
    }
  }
}
