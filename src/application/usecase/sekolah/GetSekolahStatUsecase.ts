import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {
  GetAllSekolahByKodeOkupasiInput,
  GetSekolahStatInput,
  GetSekolahStatOutput,
} from '../../../domain/sekolah/entity/sekolah';
import {GetOkupasiByKodeUsecase} from '../okupasi/GetByKodeUsecase';
import {Pagination} from '../../../util/pagination';
import {calculatePercentage} from '../../../util/percentage';

export class GetSekolahStatUsecase {
  constructor(
    private readonly sekolahRepo: SekolahRepository,
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

    const sekolahPayload: GetAllSekolahByKodeOkupasiInput = {
      search,
      limit,
      page,
      // eslint-disable-next-line camelcase
      kode_okupasi,
    };
    const [totalResult, res] = await this.sekolahRepo
        .getAllByKodeOkupasi(sekolahPayload);

    const data: GetSekolahStatOutput[] = res.map((sekolah) => {
      const kompetensiSekolahLen = sekolah.unit_kompetensi.length;

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
          unit_kompetensi: sekolah.unit_kompetensi.map((unit) => {
            return {
              id: unit.id,
              nama: unit.nama,
            };
          }),
        },
      };
    });

    return new Pagination({limit, page, totalResult, data});
  }
}
