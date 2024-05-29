import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {
  AddOkupasiReq,
  mapAddOkupasiReq,
  mapAllUnitKompetensiReq,
} from '../../../domain/okupasi/entity/okupasi';
import {OkupasiValidation} from '../../validation/OkupasiValidation';
import {Validation} from '../../validation/Validation';

export class AddOkupasiUsecase {
  constructor(private readonly okupasiRepo: OkupasiRepository) {}

  async execute(payload: AddOkupasiReq) {
    Validation.validate(OkupasiValidation.ADD, payload);

    const id = await this.okupasiRepo.add(
        mapAddOkupasiReq(payload),
        mapAllUnitKompetensiReq(payload.unit_kompetensi),
    );

    return {id};
  }
}
