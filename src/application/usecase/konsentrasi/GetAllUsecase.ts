import {KonsentrasiRepository}
  from '../../../domain/konsentrasi/KonsentrasiRepository';
import {GetAllKonsentrasiInput}
  from '../../../domain/konsentrasi/entity/konsentrasi';
import {Pagination} from '../../../util/pagination';

export class GetAllKonsentrasiUsecase {
  constructor(private readonly konsentrasiRepo: KonsentrasiRepository) {}

  async execute(payload: GetAllKonsentrasiInput) {
    payload.search = payload.search?.toUpperCase();
    payload.limit = payload.limit ? payload.limit : 10;
    payload.page = payload.page ? payload.page : 1;

    const [totalResult, data] = await this.konsentrasiRepo.getAll(payload);
    const {limit, page} = payload;

    return new Pagination({limit, page, totalResult, data});
  }
}
