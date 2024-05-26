import {UserRepository} from '../../../domain/user/UserRepository';
import {LoginOutput, LoginReq} from '../../../domain/user/entity/user';
import {Bcrypt} from '../../../infrastructure/security/Bcrypt';
import {Jwt, JwtSignPayload} from '../../../infrastructure/security/Jwt';
import {UserValidation} from '../../validation/UserValidation';
import {Validation} from '../../validation/Validation';
import {AddAuthenticationUsecase} from '../authentication/AddUsecase';

export class LoginUsecase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly addAuthenticationUsecase: AddAuthenticationUsecase,
  ) {}

  async execute(payload: LoginReq) {
    Validation.validate(UserValidation.LOGIN, payload);

    const {
      id,
      nama,
      password: hashedPassword,
      // eslint-disable-next-line camelcase
      is_super,
    }: LoginOutput = await this.userRepo.login(payload.email);

    // compare password
    await new Bcrypt().compare(payload.password, hashedPassword);

    const jwt = new Jwt();

    // define access token payload
    const jwtSignPayload: JwtSignPayload = jwt.mapJwtSignPayload({
      id,
      nama: nama,
      email: payload.email,
      // eslint-disable-next-line camelcase
      is_super,
    });

    const access = await jwt.createAccessToken(jwtSignPayload);
    const refresh = await jwt.createRefreshToken(jwtSignPayload);

    // store refresh token
    await this.addAuthenticationUsecase.execute(refresh);

    return {
      access: 'Bearer ' + access,
      refresh: 'Bearer ' + refresh,
    };
  }
}
