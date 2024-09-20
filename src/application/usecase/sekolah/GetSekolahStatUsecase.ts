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
import {calculatePercentage} from '../../../util/percentage';

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
      const kompetensiSekolah = this.findKompetensiSekolah(
          sekolah.id,
          sekolahWithKompetensi[1],
      );
      const kompetensiSekolahLen =
        kompetensiSekolah ? kompetensiSekolah.length : 0;

      return {
        id: sekolah.id,
        nama: sekolah.nama,
        kota: sekolah.kota,
        jumlah_siswa: sekolah.jumlah_siswa,
        jumlah_kelulusan: sekolah.jumlah_kelulusan,
        persentase_kelulusan: calculatePercentage(
            sekolah.jumlah_kelulusan,
            sekolah.jumlah_siswa,
        ),
        konsentrasi: sekolah.konsentrasi,
        kecocokan: calculatePercentage(
            kompetensiSekolahLen,
            okupasi.unit_kompetensi.length,
        ),
        okupasi: {
          kode: okupasi.kode,
          nama: okupasi.nama,
          unit_kompetensi: kompetensiSekolah ? kompetensiSekolah : [],
        },
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
        const res = data[i].unit_kompetensi.map((unit) => {
          return {
            id: unit.id,
            kode_unit: unit.kode_unit,
            nama: unit.nama,
            standard_kompetensi: unit.standard_kompetensi,
          };
        });
        // remove the used element array
        // to minimize the next loops
        data.splice(i, 1);

        return res;
      }
    }
  }
}
