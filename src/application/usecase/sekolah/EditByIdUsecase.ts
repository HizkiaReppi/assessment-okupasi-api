import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {
  EditSekolahReq,
  mapEditSekolahReq,
} from '../../../domain/sekolah/entity/sekolah';
import {SekolahValidation} from '../../validation/SekolahValidation';
import {Validation} from '../../validation/Validation';

export class EditSekolahByIdUsecase {
  constructor(private readonly sekolahRepo: SekolahRepository) {}

  async execute(payload: EditSekolahReq) {
    Validation.validate(SekolahValidation.EDIT_BY_ID, payload);

    await this.sekolahRepo.verify(payload.id);
    await this.sekolahRepo.editById(payload.id, mapEditSekolahReq(payload));
  }
}
