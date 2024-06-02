import {PrismaClient, Sekolah} from '@prisma/client';
import {SekolahRepository} from '../../domain/sekolah/SekolahRepository';
import {
  AddSekolahInput,
  GetAllSekolahInput,
  EditSekolahInput,
} from '../../domain/sekolah/entity/sekolah';
import {countOffset} from '../../util/pagination';
import {NotFoundError} from '../../common/error/NotFoundError';

export class SekolahRepositoryImpl implements SekolahRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(data: AddSekolahInput): Promise<string> {
    const {id} = await this.db.sekolah.create({data});

    return id;
  }

  async getAll(req: GetAllSekolahInput): Promise<[number, Sekolah[]]> {
    const where = {
      nama: {
        contains: req.search,
      },
    };

    return await Promise.all([
      this.db.sekolah.count({where}),
      this.db.sekolah.findMany({
        where,
        skip: countOffset(req.page, req.limit),
        take: req.limit,
      }),
    ]);
  }

  async getById(id: string): Promise<Sekolah> {
    const data = await this.db.sekolah.findFirst({where: {id}});
    if (!data) {
      throw new NotFoundError('sekolah tidak ditemukan');
    }

    return data;
  }

  async editById(id: string, data: EditSekolahInput): Promise<void> {
    await this.db.sekolah.update({where: {id}, data});
  }

  async deleteById(id: string): Promise<void> {
    await this.db.sekolah.delete({where: {id}});
  }

  async verify(id: string): Promise<void> {
    const res = await this.db.sekolah.count({where: {id}});
    if (!res) {
      throw new NotFoundError('sekolah tidak ditemukan');
    }
  }
}
