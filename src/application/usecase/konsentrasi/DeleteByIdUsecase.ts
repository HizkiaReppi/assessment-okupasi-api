import {KonsentrasiRepository}
  from '../../../domain/konsentrasi/KonsentrasiRepository';
import {KonsentrasiValidation} from '../../validation/KonsentrasiValidation';
import {Validation} from '../../validation/Validation';

export class DeleteKonsentrasiByIdUsecase {
  constructor(private readonly konsentrasiRepo: KonsentrasiRepository) {}

  async execute(id: string) {
    Validation.validate(KonsentrasiValidation.DELETE_BY_ID, id);

    await this.konsentrasiRepo.verify(id);
    await this.konsentrasiRepo.deleteById(id);
  }
}
