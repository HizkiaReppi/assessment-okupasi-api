import {PrismaClient} from '@prisma/client';
import {KompetensiOkupasiRepository}
  from '../../domain/kompetensi_okupasi/KompetensiOkupasiRepository';
import {
  AddKompetensiOkupasiInput,
  EditKompetensiOkupasiInput,
  VerifyKompetensiInput,
  VerifyKompetensiByKodeAndNamaInput,
} from '../../domain/kompetensi_okupasi/entity/kompetensi-okupasi';
import {NotFoundError} from '../../common/error/NotFoundError';

// eslint-disable-next-line max-len
export class KompetensiOkupasiRepositoryImpl implements KompetensiOkupasiRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(data: AddKompetensiOkupasiInput): Promise<string> {
    const res = await this.db.kompetensiOkupasi.create({data});

    return res.id;
  }

  async editById(id: string, data: EditKompetensiOkupasiInput): Promise<void> {
    await this.db.kompetensiOkupasi.update({where: {id}, data});
  }

  async deleteById(id: string): Promise<void> {
    await this.db.kompetensiOkupasi.delete({where: {id}});
  }

  async verify(req: VerifyKompetensiInput): Promise<void> {
    const res = await this.db.kompetensiOkupasi.count({where: req});
    if (!res) {
      throw new NotFoundError('okupasi atau kompetensi tidak ditemukan');
    }
  }

  async verifyByKodeAndNama(
      req: VerifyKompetensiByKodeAndNamaInput,
  ): Promise<void> {
    const res = await this.db.kompetensiOkupasi.count({where: req});
    if (!res) {
      throw new NotFoundError('okupasi atau kompetensi tidak ditemukan');
    }
  }
}
