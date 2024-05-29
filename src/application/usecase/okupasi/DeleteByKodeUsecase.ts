import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {OkupasiValidation} from '../../validation/OkupasiValidation';
import {Validation} from '../../validation/Validation';

export class DeleteOkupasiByKodeUsecase {
  constructor(private readonly okupasiRepo: OkupasiRepository) {}

  async execute(kode: string) {
    Validation.validate(OkupasiValidation.DELETE_BY_KODE, kode);

    await this.okupasiRepo.verify(kode);
    await this.okupasiRepo.deleteByKode(kode);
  }
}
