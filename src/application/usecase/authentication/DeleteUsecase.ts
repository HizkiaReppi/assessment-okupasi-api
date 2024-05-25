import {AuthenticationRepository}
  from '../../../domain/authentication/AuthenticationRepository';

export class DeleteAuthenticationUsecase {
  constructor(private readonly authenticationRepo: AuthenticationRepository) {}

  async execute(refreshToken: string) {
    await this.authenticationRepo.get(refreshToken);
    await this.authenticationRepo.delete(refreshToken);
  }
}
