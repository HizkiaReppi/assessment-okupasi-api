import {KompetensiOkupasiRepository}
  from '../../../domain/kompetensi_okupasi/KompetensiOkupasiRepository';
import {
  DeleteKompetensiOkupasiReq,
  VerifyKompetensiInput,
} from '../../../domain/kompetensi_okupasi/entity/kompetensi-okupasi';
import {KompetensiOkupasiValidation}
  from '../../validation/KompetensiOkupasiValidation';
import {Validation} from '../../validation/Validation';

export class DeleteKompetensiOkupasiByIdUsecase {
  constructor(
    private readonly kompetensiOkupasiRepo: KompetensiOkupasiRepository,
  ) {}

  async execute(payload: DeleteKompetensiOkupasiReq) {
    Validation.validate(KompetensiOkupasiValidation.DELETE_BY_ID, payload);

    const verifyPayload: VerifyKompetensiInput = {
      id: payload.id,
      kode_okupasi: payload.kode_okupasi,
    };
    await this.kompetensiOkupasiRepo.verify(verifyPayload);
    await this.kompetensiOkupasiRepo.deleteById(payload.id);
  }
}
