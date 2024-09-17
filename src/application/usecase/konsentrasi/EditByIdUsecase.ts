import {KonsentrasiRepository}
  from '../../../domain/konsentrasi/KonsentrasiRepository';
import {
  EditKonsentrasiReq,
  mapEditKonsentrasiReq,
} from '../../../domain/konsentrasi/entity/konsentrasi';
import {KonsentrasiValidation} from '../../validation/KonsentrasiValidation';
import {Validation} from '../../validation/Validation';

export class EditKonsentrasiByIdUsecase {
  constructor(private readonly konsentrasiRepo: KonsentrasiRepository) {}

  async execute(payload: EditKonsentrasiReq) {
    Validation.validate(KonsentrasiValidation.EDIT_BY_ID, payload);

    await this.konsentrasiRepo.verify(payload.id);
    await this.konsentrasiRepo.editById(
        payload.id,
        mapEditKonsentrasiReq(payload),
    );
  }
}
