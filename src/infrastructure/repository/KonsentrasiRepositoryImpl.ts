import {PrismaClient, Konsentrasi} from '@prisma/client';
import {KonsentrasiRepository}
  from '../../domain/konsentrasi/KonsentrasiRepository';
import {
  AddKonsentrasiInput,
  GetAllKonsentrasiInput,
  EditKonsentrasiInput,
} from '../../domain/konsentrasi/entity/konsentrasi';
import {countOffset} from '../../util/pagination';
import {NotFoundError} from '../../common/error/NotFoundError';
import {isPrismaError} from '../../common/error/prisma-error';

export class KonsentrasiRepositoryImpl implements KonsentrasiRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(data: AddKonsentrasiInput): Promise<string> {
    try {
      const {id} = await this.db.konsentrasi.create({data});

      return id;
    } catch (e) {
      isPrismaError(e);

      throw e;
    }
  }

  async getAll(req: GetAllKonsentrasiInput): Promise<[number, Konsentrasi[]]> {
    const where = {
      nama: {
        contains: req.search,
      },
    };

    return await Promise.all([
      this.db.konsentrasi.count({where}),
      this.db.konsentrasi.findMany({
        where,
        skip: countOffset(req.page, req.limit),
        take: req.limit,
      }),
    ]);
  }

  async editById(id: string, data: EditKonsentrasiInput): Promise<void> {
    try {
      await this.db.konsentrasi.update({where: {id}, data});
    } catch (e) {
      isPrismaError(e);

      throw e;
    }
  }

  async deleteById(id: string): Promise<void> {
    await this.db.konsentrasi.delete({where: {id}});
  }

  async verify(id: string): Promise<void> {
    const res = await this.db.konsentrasi.count({where: {id}});
    if (!res) {
      throw new NotFoundError('konsentrasi tidak ditemukan');
    }
  }

  async verifyAll(ids: string[]): Promise<void> {
    const res = await this.db.konsentrasi.count({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (res != ids.length) {
      throw new NotFoundError('beberapa konsentrasi tidak ditemukan');
    }
  }
}
