import {PrismaClient, Users} from '@prisma/client';
import {UserRepository} from '../../domain/user/UserRepository';
import {AddUserInput, LoginOutput} from '../../domain/user/entity/user';
import {AuthenticationError} from '../../common/error/AuthenticationError';
import {NotFoundError} from '../../common/error/NotFoundError';
import {InternalServerError} from '../../common/error/InternalServerError';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(req: AddUserInput): Promise<void> {
    await this.db.users.create({data: req});
  }

  async login(email: string): Promise<LoginOutput> {
    const data = await this.db.users.findUnique({
      where: {email},
      select: {
        id: true,
        nama: true,
        password: true,
        is_super: true,
      },
    });
    if (!data) {
      throw new AuthenticationError('email atau password salah');
    }

    return data;
  }

  async getById(id: string): Promise<Users> {
    const data = await this.db.users.findUnique({
      where: {id, deleted_at: null},
    });
    if (!data) {
      throw new NotFoundError('user tidak ditemukan');
    }

    return data;
  }

  async getAll(): Promise<Users[]> {
    return await this.db.users.findMany({where: {deleted_at: null}});
  }

  async changeEmail(id: string, email: string): Promise<void> {
    await this.db.users.update({where: {id}, data: {email}});
  }

  async changePassword(id: string, password: string): Promise<void> {
    await this.db.users.update({where: {id}, data: {password}});
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.db.users.update({
        where: {id: id},
        data: {deleted_at: new Date()},
      });
    } catch {
      throw new InternalServerError('failed delete user');
    }
  }

  async verify(id: string): Promise<void> {
    const result = await this.db.users.count({where: {id, deleted_at: null}});
    if (!result) {
      throw new NotFoundError('user tidak ditemukan');
    }
  }
}
