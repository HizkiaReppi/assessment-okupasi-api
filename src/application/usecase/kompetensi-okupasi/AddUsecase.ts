import {KompetensiOkupasiRepository}
  from '../../../domain/kompetensi_okupasi/KompetensiOkupasiRepository';
import {
  AddKompetensiOkupasiReq,
  VerifyKompetensiByKodeAndNamaInput,
  mapAddKompetensiOkupasiReq,
} from '../../../domain/kompetensi_okupasi/entity/kompetensi-okupasi';
import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {KompetensiOkupasiValidation}
  from '../../validation/KompetensiOkupasiValidation';
import {Validation} from '../../validation/Validation';

export class AddKompetensiOkupasiUsecase {
  constructor(
    private readonly kompetensiOkupasiRepo: KompetensiOkupasiRepository,
    private readonly okupasiRepo: OkupasiRepository,
  ) {}

  async execute(payload: AddKompetensiOkupasiReq) {
    Validation.validate(KompetensiOkupasiValidation.ADD, payload);

    await this.okupasiRepo.verify(payload.kode_okupasi);

    // verify kompetensi okupasi by kode and nama
    // if throw error means it is not found
    // then add the kompetensi okupasi
    try {
      const verifyPayload: VerifyKompetensiByKodeAndNamaInput = {
        kode_okupasi: payload.kode_okupasi,
        nama: payload.nama,
      };
      await this.kompetensiOkupasiRepo.verifyByKodeAndNama(verifyPayload);
    } catch {
      await this.kompetensiOkupasiRepo.add(
          mapAddKompetensiOkupasiReq(payload),
      );
    }
  }
}
