import {UserRepository} from '../../../domain/user/UserRepository';
import {UserValidation} from '../../validation/UserValidation';
import {Validation} from '../../validation/Validation';

export class ChangeEmailUsecase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute({id= '', email= ''}) {
    Validation.validate(UserValidation.CHANGE_EMAIL, {id, email});

    await this.userRepo.verify(id);
    await this.userRepo.changeEmail(id, email);
  }
}
