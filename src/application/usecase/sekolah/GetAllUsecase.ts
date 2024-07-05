import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {GetAllSekolahInput} from '../../../domain/sekolah/entity/sekolah';
import {Pagination} from '../../../util/pagination';
import {calculatePercentage} from '../../../util/percentage';

export class GetAllSekolahUsecase {
  constructor(private readonly sekolahRepo: SekolahRepository) {}

  async execute(payload: GetAllSekolahInput) {
    payload.search = payload.search?.toUpperCase();
    payload.limit = payload.limit ? payload.limit : 10;
    payload.page = payload.page ? payload.page : 1;

    let [totalResult, data] = await this.sekolahRepo.getAll(payload);
    data = data.map( (v) => {
      return {
        ...v,
        persentase_kelulusan: calculatePercentage(
            v.jumlah_kelulusan,
            v.jumlah_siswa,
        ),
      };
    });

    const {limit, page} = payload;

    return new Pagination({limit, page, totalResult, data});
  }
}
