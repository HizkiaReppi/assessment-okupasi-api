import {KompetensiLulusanRepository}
  from '../../../domain/kompetensi_lulusan/KompetensiLulusanRepository';
import {DeleteKompetensiLulusanReq, mapDeleteKompetensiLulusanReq}
  from '../../../domain/kompetensi_lulusan/entity/kompetensi-lulusan';
import {KompetensiLulusanValidation}
  from '../../validation/KompetensiLulusanValidation';
import {Validation} from '../../validation/Validation';

export class DeleteKompetensiLulusanByIdUsecase {
  constructor(
    private readonly kompetensiLulusanRepo: KompetensiLulusanRepository,
  ) {}

  async execute(payload: DeleteKompetensiLulusanReq) {
    Validation.validate(KompetensiLulusanValidation.DELETE_BY_ID, payload);

    const input = mapDeleteKompetensiLulusanReq(payload);
    await this.kompetensiLulusanRepo.verify(input);
    await this.kompetensiLulusanRepo.delete(input);
  }
}
