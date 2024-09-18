import {PrismaClient} from '@prisma/client';
import {KonsentrasiSekolahRepository}
  from '../../domain/konsentrasi_sekolah/KonsentrasiSekolahRepository';
import {AddKonsentrasiSekolahInput}
  from '../../domain/konsentrasi_sekolah/entity/konsentrasi-sekolah';

export class KonsentrasiSekolahRepositoryImpl
implements KonsentrasiSekolahRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(data: AddKonsentrasiSekolahInput[]): Promise<void> {
    await this.db.konsentrasiSekolah.createMany({data});
  }

  async deleteBySekolahId(idSekolah: string): Promise<void> {
    await this.db.konsentrasiSekolah.deleteMany({
      where: {id_sekolah: idSekolah},
    });
  }
}
