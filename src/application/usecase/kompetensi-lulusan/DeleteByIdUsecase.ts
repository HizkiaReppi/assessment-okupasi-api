import {KompetensiLulusanRepository}
  from '../../../domain/kompetensi_lulusan/KompetensiLulusanRepository';
import {KompetensiLulusanInput}
  from '../../../domain/kompetensi_lulusan/entity/kompetensi-lulusan';
import {KompetensiLulusanValidation}
  from '../../validation/KompetensiLulusanValidation';
import {Validation} from '../../validation/Validation';

export class DeleteKompetensiLulusanByIdUsecase {
  constructor(
    private readonly kompetensiLulusanRepo: KompetensiLulusanRepository,
  ) {}

  async execute(payload: KompetensiLulusanInput) {
    Validation.validate(KompetensiLulusanValidation.DELETE_BY_ID, payload);

    await this.kompetensiLulusanRepo.verify(payload);
    await this.kompetensiLulusanRepo.delete(payload);
  }
}
