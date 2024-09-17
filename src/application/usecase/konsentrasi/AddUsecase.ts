import {KonsentrasiRepository}
  from '../../../domain/konsentrasi/KonsentrasiRepository';
import {
  AddKonsentrasiReq,
  mapAddKonsentrasiReq,
} from '../../../domain/konsentrasi/entity/konsentrasi';
import {KonsentrasiValidation} from '../../validation/KonsentrasiValidation';
import {Validation} from '../../validation/Validation';

export class AddKonsentrasiUsecase {
  constructor(private readonly konsentrasiRepo: KonsentrasiRepository) {}

  async execute(payload: AddKonsentrasiReq) {
    Validation.validate(KonsentrasiValidation.ADD, payload);

    const id = await this.konsentrasiRepo.add(mapAddKonsentrasiReq(payload));

    return {id};
  }
}
