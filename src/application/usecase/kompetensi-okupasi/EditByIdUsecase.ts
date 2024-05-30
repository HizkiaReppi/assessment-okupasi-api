import {KompetensiOkupasiRepository}
  from '../../../domain/kompetensi_okupasi/KompetensiOkupasiRepository';
import {
  EditKompetensiOkupasiReq,
  VerifyKompetensiInput,
  mapEditKompetensiOkupasiReq,
} from '../../../domain/kompetensi_okupasi/entity/kompetensi-okupasi';
import {KompetensiOkupasiValidation}
  from '../../validation/KompetensiOkupasiValidation';
import {Validation} from '../../validation/Validation';

export class EditKompetensiOkupasiByIdUsecase {
  constructor(
    private readonly kompetensiOkupasiRepo: KompetensiOkupasiRepository,
  ) {}

  async execute(payload: EditKompetensiOkupasiReq) {
    Validation.validate(KompetensiOkupasiValidation.EDIT_BY_ID, payload);

    const verifyPayload: VerifyKompetensiInput = {
      id: payload.id,
      kode_okupasi: payload.kode_okupasi,
    };
    await this.kompetensiOkupasiRepo.verify(verifyPayload);
    await this.kompetensiOkupasiRepo.editById(
        payload.id,
        mapEditKompetensiOkupasiReq(payload),
    );
  }
}
