import {PrismaClient} from '@prisma/client';
import {KonsentrasiRepository}
  from '../../domain/konsentrasi/KonsentrasiRepository';
import {
  AddKonsentrasiInput,
  GetAllKonsentrasiInput,
  EditKonsentrasiInput,
  GetAllKonsentrasiOutput,
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

  async getAll(
      req: GetAllKonsentrasiInput,
  ): Promise<[number, GetAllKonsentrasiOutput[]]> {
    const where = {
      nama: {
        contains: req.search,
      },
    };

    const [totalResult, data] = await Promise.all([
      this.db.konsentrasi.count({where}),
      this.db.konsentrasi.findMany({
        include: {
          _count: {
            select: {konsentrasiSekolah: true},
          },
        },
        where,
        skip: countOffset(req.page, req.limit),
        take: req.limit,
      }),
    ]);

    const res = data.map((v) => {
      const {_count, ...rest} = v;
      return {
        ...rest,
        total_sekolah: _count.konsentrasiSekolah,
      };
    });

    return [totalResult, res];
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
