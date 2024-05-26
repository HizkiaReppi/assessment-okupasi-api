import {UserRepository} from '../../../domain/user/UserRepository';
import {UserRes} from '../../../domain/user/entity/user';

export class GetAllUserUsecase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute() {
    const data = await this.userRepo.getAll();
    const res: UserRes[] = data.map((user) => {
      return {
        id: user.id,
        nama: user.nama,
        email: user.email,
        is_super: user.is_super,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    });

    return res;
  }
}
