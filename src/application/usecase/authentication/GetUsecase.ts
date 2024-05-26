import {AuthenticationRepository}
  from '../../../domain/authentication/AuthenticationRepository';
import {Jwt} from '../../../infrastructure/security/Jwt';
import {AuthenticationError} from '../../../common/error/AuthenticationError';

export class GetAuthenticationUsecase {
  constructor(private readonly authenticationRepo: AuthenticationRepository) {}

  async execute(refreshToken: string) {
    const refresh = await this.authenticationRepo.get(refreshToken);
    try {
      await new Jwt().verifyRefreshToken(refreshToken);
    } catch (e) {
      await this.authenticationRepo.delete(refreshToken);

      throw new AuthenticationError();
    }

    return refresh;
  }
}
