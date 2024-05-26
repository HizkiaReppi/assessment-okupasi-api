import {DeleteAuthenticationUsecase} from '../authentication/DeleteUsecase';

export class LogoutUsecase {
  constructor(
    private readonly deleteAuthenticationUsecase: DeleteAuthenticationUsecase,
  ) {}

  async execute(refreshToken: string) {
    await this.deleteAuthenticationUsecase.execute(refreshToken);
  }
}
