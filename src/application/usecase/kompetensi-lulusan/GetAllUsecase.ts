import {KompetensiLulusanRepository}
  from '../../../domain/kompetensi_lulusan/KompetensiLulusanRepository';
import {GetAllKompetensiLulusanByIdSekolahInput}
  from '../../../domain/kompetensi_lulusan/entity/kompetensi-lulusan';
import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {Pagination} from '../../../util/pagination';

export class GetAllKompetensiLulusanUsecase {
  constructor(
    private readonly kompetensiLulusanRepo: KompetensiLulusanRepository,
    private readonly sekolahRepo: SekolahRepository,
  ) {}

  async execute(payload: GetAllKompetensiLulusanByIdSekolahInput) {
    await this.sekolahRepo.verify(payload.id_sekolah);

    payload.search = payload.search?.toUpperCase();
    payload.limit = payload.limit ? payload.limit : 10;
    payload.page = payload.page ? payload.page : 1;


    const [totalResult, data] = await this.kompetensiLulusanRepo
        .getAllByIdSekolah(payload);

    const {limit, page} = payload;

    return new Pagination({limit, page, totalResult, data});
  }
}
