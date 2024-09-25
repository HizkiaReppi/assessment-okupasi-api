import {PrismaClient} from '@prisma/client';
import {KompetensiLulusanRepository}
  from '../../domain/kompetensi_lulusan/KompetensiLulusanRepository';
import {
  GetAllKompetensiLulusanByIdSekolahInput,
  GetAllKompetensiLulusanByIdSekolahOutput,
  KompetensiLulusanInput,
}
  from '../../domain/kompetensi_lulusan/entity/kompetensi-lulusan';
import {NotFoundError} from '../../common/error/NotFoundError';
import {countOffset} from '../../util/pagination';

// eslint-disable-next-line max-len
export class KompetensiLulusanRepositoryImpl implements KompetensiLulusanRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(data: KompetensiLulusanInput[]): Promise<void> {
    await this.db.kompetensiLulusan.createMany({data});
  }

  async getAllByIdSekolah(
      req: GetAllKompetensiLulusanByIdSekolahInput,
  ): Promise<[number, GetAllKompetensiLulusanByIdSekolahOutput[]]> {
    const where = {
      nama: {
        contains: req.search,
      },
      unit_kompetensi: {
        some: {
          kompetensi_lulusan: {
            some: {id_sekolah: req.id_sekolah},
          },
        },
      },
    };

    const [totalResult, data] = await Promise.all([
      this.db.okupasi.count({where}),
      this.db.okupasi.findMany({
        include: {
          unit_kompetensi: {
            select: {
              id: true,
              kode_unit: true,
              nama: true,
              standard_kompetensi: true,
            },
            where: {
              kompetensi_lulusan: {
                some: {
                  id_sekolah: req.id_sekolah,
                },
              },
            },
          },
        },
        where,
        skip: countOffset(req.page, req.limit),
        take: req.limit,
      }),
    ]);

    const res: GetAllKompetensiLulusanByIdSekolahOutput[] = data.map((v) => {
      return {
        kode: v.kode,
        nama: v.nama,
        unit_kompetensi: v.unit_kompetensi.map((kompetensi) => {
          return {
            id: kompetensi.id,
            kode_unit: kompetensi.kode_unit as string,
            nama: kompetensi.nama,
            standard_kompetensi: kompetensi.standard_kompetensi as string,
          };
        }),
      };
    });

    return [totalResult, res];
  }

  async delete(req: KompetensiLulusanInput): Promise<void> {
    await this.db.kompetensiLulusan.deleteMany({where: req});
  }

  async deleteByKodeOkupasi(idSekolah: string, kode: string): Promise<void> {
    await this.db.kompetensiLulusan.deleteMany({
      where: {
        id_sekolah: idSekolah,
        kompetensi: {
          kode_okupasi: kode,
        },
      },
    });
  }

  async verify(req: KompetensiLulusanInput): Promise<void> {
    const res = await this.db.kompetensiLulusan.count({where: req});
    if (!res) {
      throw new NotFoundError('unit kompetensi tidak ditemukan');
    }
  }

  async countByKode(idSekolah: string, kode: string): Promise<number> {
    return await this.db.kompetensiLulusan.count({
      where: {
        id_sekolah: idSekolah,
        kompetensi: {
          kode_okupasi: kode,
        },
      },
    });
  }
}
