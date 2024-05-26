import {UserRepository} from '../../../domain/user/UserRepository';
import {Bcrypt} from '../../../infrastructure/security/Bcrypt';
import {UserValidation} from '../../validation/UserValidation';
import {Validation} from '../../validation/Validation';

export class ChangePasswordUsecase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute({id= '', password= ''}) {
    Validation.validate(UserValidation.CHANGE_PASSWORD, {id, password});

    await this.userRepo.verify(id);

    const hashedPassword = await new Bcrypt().hash(password);

    await this.userRepo.changePassword(id, hashedPassword);
  }
}
