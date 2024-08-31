import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {GetAllOkupasiInput} from '../../../domain/okupasi/entity/okupasi';
import {Pagination} from '../../../util/pagination';

export class GetAllOkupasiUsecase {
  constructor(private readonly okupasiRepo: OkupasiRepository) {}

  async execute(payload: GetAllOkupasiInput) {
    payload.search = payload.search?.toUpperCase();
    payload.limit = payload.limit ? payload.limit : 10;
    payload.page = payload.page ? payload.page : 1;

    const [totalResult, data] = await this.okupasiRepo.getAll(payload);

    const {limit, page} = payload;

    return new Pagination({limit, page, totalResult, data});
  }
}
