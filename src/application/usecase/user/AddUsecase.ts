import {UserRepository} from '../../../domain/user/UserRepository';
import {AddUserReq, mapAddUserReq} from '../../../domain/user/entity/user';
import {UserValidation} from '../../validation/UserValidation';
import {Validation} from '../../validation/Validation';

export class AddUserUsecase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(payload: AddUserReq) {
    Validation.validate(UserValidation.ADD, payload);
    const input = await mapAddUserReq(payload);
    await this.userRepo.add(input);
  }
}
