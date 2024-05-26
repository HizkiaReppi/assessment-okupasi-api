import {UserRepository} from '../../../domain/user/UserRepository';
import {UserValidation} from '../../validation/UserValidation';
import {Validation} from '../../validation/Validation';

export class DeleteUserById {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string) {
    Validation.validate(UserValidation.DELETE, {id});

    await this.userRepo.verify(id);
    await this.userRepo.deleteById(id);
  }
}
