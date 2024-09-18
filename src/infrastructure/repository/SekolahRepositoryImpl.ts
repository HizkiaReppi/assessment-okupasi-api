import {PrismaClient} from '@prisma/client';
import {SekolahRepository} from '../../domain/sekolah/SekolahRepository';
import {
  AddSekolahInput,
  GetAllSekolahInput,
  EditSekolahInput,
  GetSekolahOutput,
} from '../../domain/sekolah/entity/sekolah';
import {countOffset} from '../../util/pagination';
import {NotFoundError} from '../../common/error/NotFoundError';

export class SekolahRepositoryImpl implements SekolahRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(data: AddSekolahInput): Promise<string> {
    const {id} = await this.db.sekolah.create({data});

    return id;
  }

  async getAll(req: GetAllSekolahInput): Promise<[number, GetSekolahOutput[]]> {
    const where = {
      nama: {
        contains: req.search,
      },
    };

    const [totalResult, data] = await Promise.all([
      this.db.sekolah.count({where}),
      this.db.sekolah.findMany({
        include: {
          konsentrasi: {
            include: {
              konsentrasi: true,
            },
          },
        },
        where,
        skip: countOffset(req.page, req.limit),
        take: req.limit,
      }),
    ]);

    const res: GetSekolahOutput[] = data.map((v) => {
      return {
        id: v.id,
        nama: v.nama,
        kota: v.kota,
        jumlah_siswa: v.jumlah_siswa,
        jumlah_kelulusan: v.jumlah_kelulusan,
        konsentrasi: v.konsentrasi?.map((konsentrasi) => {
          const konsentrasiSekolah = konsentrasi.konsentrasi;
          return {
            id: konsentrasiSekolah.id,
            nama: konsentrasiSekolah.nama,
          };
        }),
      };
    });

    return [totalResult, res];
  }

  async getById(id: string): Promise<GetSekolahOutput> {
    const data = await this.db.sekolah.findFirst({
      include: {
        konsentrasi: {
          include: {
            konsentrasi: true,
          },
        },
      },
      where: {id},
    });
    if (!data) {
      throw new NotFoundError('sekolah tidak ditemukan');
    }

    const res: GetSekolahOutput = {
      id: data.id,
      nama: data.nama,
      kota: data.kota,
      jumlah_siswa: data.jumlah_siswa,
      jumlah_kelulusan: data.jumlah_kelulusan,
      konsentrasi: data.konsentrasi?.map((konsentrasi) => {
        const konsentrasiSekolah = konsentrasi.konsentrasi;
        return {
          id: konsentrasiSekolah.id,
          nama: konsentrasiSekolah.nama,
        };
      }),
    };

    return res;
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
