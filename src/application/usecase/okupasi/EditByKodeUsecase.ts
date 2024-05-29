import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {
  EditOkupasiReq,
  mapEditOkupasiReq,
} from '../../../domain/okupasi/entity/okupasi';
import {OkupasiValidation} from '../../validation/OkupasiValidation';
import {Validation} from '../../validation/Validation';

export class EditOkupasiByKodeUsecase {
  constructor(private readonly okupasiRepo: OkupasiRepository) {}

  async execute(payload: EditOkupasiReq) {
    Validation.validate(OkupasiValidation.EDIT_BY_KODE, payload);

    await this.okupasiRepo.verify(payload.kode);
    await this.okupasiRepo.editByKode(payload.kode, mapEditOkupasiReq(payload));
  }
}
