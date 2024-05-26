import {JwtPayload} from 'jsonwebtoken';
import {AuthenticationRepository}
  from '../../../domain/authentication/AuthenticationRepository';
import {Jwt} from '../../../infrastructure/security/Jwt';
import {AuthenticationError} from '../../../common/error/AuthenticationError';

export class AddAuthenticationUsecase {
  constructor(private readonly authenticationRepo: AuthenticationRepository) {}

  async execute(refreshToken: string) {
    try {
      const jwt = await new Jwt()
          .verifyRefreshToken(refreshToken) as JwtPayload;
      // convert from nanomilis to Date
      const exp = new Date(jwt.exp as number / 1000000);

      await this.authenticationRepo.add(refreshToken, exp);
    } catch {
      throw new AuthenticationError();
    }
  }
}
