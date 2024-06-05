import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {SekolahValidation} from '../../validation/SekolahValidation';
import {Validation} from '../../validation/Validation';

export class GetSekolahByIdUsecase {
  constructor(private readonly sekolahRepo: SekolahRepository) {}

  async execute(id: string) {
    Validation.validate(SekolahValidation.GET_BY_ID, id);

    const data = await this.sekolahRepo.getById(id);

    return data;
  }
}
