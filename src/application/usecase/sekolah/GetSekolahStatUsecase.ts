import {KompetensiOkupasi} from '@prisma/client';
import {KompetensiLulusanRepository}
  from '../../../domain/kompetensi_lulusan/KompetensiLulusanRepository';
import {
  GetAllKompetensiLulusanByKodeOkupasiInput,
  GetAllKompetensiLulusanByKodeOkupasiOutput,
} from '../../../domain/kompetensi_lulusan/entity/kompetensi-lulusan';
import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {
  GetSekolahStatInput,
  GetSekolahStatOutput,
} from '../../../domain/sekolah/entity/sekolah';
import {GetOkupasiByKodeUsecase} from '../okupasi/GetByKodeUsecase';
import {Pagination} from '../../../util/pagination';

export class GetSekolahStatUsecase {
  constructor(
    private readonly sekolahRepo: SekolahRepository,
    private readonly kompetensiLulusanRepo: KompetensiLulusanRepository,
    private readonly okupasiRepo: OkupasiRepository,
    private readonly getOkupasiByKodeUsecase: GetOkupasiByKodeUsecase,
  ) {}

  async execute(payload: GetSekolahStatInput) {
    payload.search = payload.search?.toUpperCase();
    payload.limit = payload.limit ? payload.limit : 10;
    payload.page = payload.page ? payload.page : 1;
    // eslint-disable-next-line camelcase
    const {search, limit, page, kode_okupasi} = payload;

    await this.okupasiRepo.verify(kode_okupasi);

    const okupasi = await this.getOkupasiByKodeUsecase.execute(kode_okupasi);

    const sekolahPayload: GetAllKompetensiLulusanByKodeOkupasiInput = {
      search,
      limit,
      page,
      // eslint-disable-next-line camelcase
      kode_okupasi,
    };

    const [totalResult, sekolah] = await this.sekolahRepo
        .getAll(sekolahPayload);

    const sekolahWithKompetensi = await this.kompetensiLulusanRepo
        .getAllByKodeOkupasi(sekolahPayload);

    const data: GetSekolahStatOutput[] = sekolah.map((sekolah) => {
      return {
        id: sekolah.id,
        nama: sekolah.nama,
        kota: sekolah.kota,
        kecocokan: this.calculateKecocokan(
            this.findKompetensiSekolah(sekolah.id, sekolahWithKompetensi[1]),
            okupasi.unit_kompetensi.length,
        ),
      };
    });

    return new Pagination({limit, page, totalResult, data});
  }

  private findKompetensiSekolah(
      id: string,
      data: GetAllKompetensiLulusanByKodeOkupasiOutput[],
  ) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        const res = data[i].unit_kompetensi;
        // remove the used element array
        // to minimize the next loops
        data.splice(i, 1);

        return res;
      }
    }
  }

  private calculateKecocokan(
      data: KompetensiOkupasi[] | undefined,
      kompetensiOkupasiLen: number,
  ): string {
    const kompetensiLen = data ? data.length : 0;
    const percentage = (kompetensiLen / kompetensiOkupasiLen) * 100;

    return percentage.toString() + '%';
  }
}
