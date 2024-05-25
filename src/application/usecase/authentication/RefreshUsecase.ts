import {JwtPayload} from 'jsonwebtoken';
import {AuthenticationRepository}
  from '../../../domain/authentication/AuthenticationRepository';
import {Jwt, JwtSignPayload} from '../../../infrastructure/security/Jwt';
import {prismaClient} from '../../../infrastructure/database/prisma';
import {GetAuthenticationUsecase} from './GetUsecase';
import {AuthenticationError} from '../../../common/error/AuthenticationError';

export class RefreshAuthenticationUsecase {
  constructor(
    private readonly authenticationRepo: AuthenticationRepository,
    private readonly getAuthenticationUsecase: GetAuthenticationUsecase,
  ) {}

  async execute(refreshToken: string) {
    const jwt = new Jwt();
    try {
      await this.getAuthenticationUsecase.execute(refreshToken);

      const jwtPayload = await jwt.decode(refreshToken);
      const signPayload = jwt.mapJwtSignPayload(jwtPayload as JwtSignPayload);

      const access = await jwt.createAccessToken(signPayload);
      const newRefresh = await jwt.createRefreshToken(signPayload);
      const {exp: expInMilis} = await jwt.decode(newRefresh) as JwtPayload;

      // convert from nanomilis to Date
      const exp = new Date(expInMilis as number / 1000000);

      await prismaClient.$transaction(async (tx) => {
        await this.authenticationRepo.delete(refreshToken);
        await this.authenticationRepo.add(newRefresh, exp);
      });

      return {access: 'Bearer ' + access, refresh: 'Bearer ' + newRefresh};
    } catch {
      throw new AuthenticationError();
    }
  }
}
