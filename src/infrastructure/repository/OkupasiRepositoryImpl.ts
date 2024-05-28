import {Okupasi, PrismaClient} from '@prisma/client';
import {OkupasiRepository} from '../../domain/okupasi/OkupasiRepository';
import {
  AddOkupasiInput,
  GetAllOkupasiInput,
  GetOkupasiByKodeOutput,
  EditOkupasiInput,
  UnitKompetensiInput,
} from '../../domain/okupasi/entity/okupasi';
import {countOffset} from '../../util/pagination';
import {NotFoundError} from '../../common/error/NotFoundError';

export class OkupasiRepositoryImpl implements OkupasiRepository {
  constructor(private readonly db: PrismaClient) {}
  async add(
      okupasi: AddOkupasiInput,
      unitKompetensi: UnitKompetensiInput[],
  ): Promise<string> {
    const res = await this.db.okupasi.create({
      data: {
        ...okupasi,
        unit_kompetensi: {
          createMany: {
            data: unitKompetensi,
          },
        },
      },
    });

    return res.kode;
  }

  async getAll(req: GetAllOkupasiInput): Promise<[number, Okupasi[]]> {
    const where = {
      nama: {contains: req.search},
    };

    return await Promise.all([
      this.db.okupasi.count({where}),
      this.db.okupasi.findMany({
        where,
        skip: countOffset(req.page, req.limit),
        take: req.limit,
      }),
    ]);
  }

  async getByKode(kode: string): Promise<GetOkupasiByKodeOutput> {
    const data = await this.db.okupasi.findFirst({
      where: {kode},
      include: {unit_kompetensi: true},
    });
    if (!data) {
      throw new NotFoundError('okupasi tidak ditemukan');
    }

    return data;
  }

  async editByKode(kode: string, data: EditOkupasiInput): Promise<void> {
    await this.db.okupasi.update({where: {kode}, data});
  }

  async deleteByKode(kode: string): Promise<void> {
    await this.db.okupasi.delete({where: {kode}});
  }

  async verify(kode: string): Promise<void> {
    const res = await this.db.okupasi.count({where: {kode}});
    if (!res) {
      throw new NotFoundError('okupasi tidak ditemukan');
    }
  }
}
