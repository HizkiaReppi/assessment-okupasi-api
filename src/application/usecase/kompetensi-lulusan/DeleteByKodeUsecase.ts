import {KompetensiLulusanRepository}
  from '../../../domain/kompetensi_lulusan/KompetensiLulusanRepository';
import {KompetensiLulusanValidation}
  from '../../validation/KompetensiLulusanValidation';
import {Validation} from '../../validation/Validation';

export class DeleteKompetensiLulusanByKodeUsecase {
  constructor(
    private readonly kompetensiLulusanRepo: KompetensiLulusanRepository,
  ) {}

  async execute(payload: {id: string, kode: string}) {
    Validation.validate(KompetensiLulusanValidation.DELETE_BY_KODE, payload);

    await this.kompetensiLulusanRepo
        .deleteByKodeOkupasi(payload.id, payload.kode);
  }
}
