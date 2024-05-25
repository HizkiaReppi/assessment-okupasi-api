import {PrismaClient, User} from '@prisma/client';
import {isPrismaError} from '../../common/error/prisma-error';
import {UserRepository} from '../../domain/user/UserRepository';
import {AddUserInput, LoginOutput} from '../../domain/user/entity/user';
import {AuthenticationError} from '../../common/error/AuthenticationError';
import {NotFoundError} from '../../common/error/NotFoundError';
import {InternalServerError} from '../../common/error/InternalServerError';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(req: AddUserInput): Promise<void> {
    try {
      await this.db.user.create({data: req});
    } catch (e) {
      isPrismaError(e);

      throw e;
    }
  }

  async login(email: string): Promise<LoginOutput> {
    const data = await this.db.user.findUnique({
      where: {email},
      select: {
        id: true,
        password: true,
        is_super: true,
      },
    });
    if (!data) {
      throw new AuthenticationError('email atau password salah');
    }

    return data;
  }

  async getById(id: string): Promise<User> {
    const data = await this.db.user.findUnique({where: {id, deleted_at: null}});
    if (!data) {
      throw new NotFoundError('user tidak ditemukan');
    }

    return data;
  }

  async getAll(): Promise<User[]> {
    return await this.db.user.findMany({where: {deleted_at: null}});
  }

  async changeEmail(id: string, email: string): Promise<void> {
    try {
      await this.db.user.update({where: {id}, data: {email}});
    } catch (e) {
      isPrismaError(e);

      throw e;
    }
  }

  async changePassword(id: string, password: string): Promise<void> {
    try {
      await this.db.user.update({where: {id}, data: {password}});
    } catch (e) {
      isPrismaError(e);

      throw e;
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.db.user.update({
        where: {id: id},
        data: {deleted_at: new Date()},
      });
    } catch {
      throw new InternalServerError('failed delete akun');
    }
  }

  async verify(id: string): Promise<void> {
    const result = await this.db.user.count({where: {id, deleted_at: null}});
    if (!result) {
      throw new NotFoundError('user tidak ditemukan');
    }
  }
}
