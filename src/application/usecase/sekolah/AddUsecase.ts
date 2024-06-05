import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {
  AddSekolahReq,
  mapAddSekolahReq,
} from '../../../domain/sekolah/entity/sekolah';
import {SekolahValidation} from '../../validation/SekolahValidation';
import {Validation} from '../../validation/Validation';

export class AddSekolahUsecase {
  constructor(private readonly sekolahRepo: SekolahRepository) {}

  async execute(payload: AddSekolahReq) {
    Validation.validate(SekolahValidation.ADD, payload);

    const id = await this.sekolahRepo.add(mapAddSekolahReq(payload));

    return {id};
  }
}
