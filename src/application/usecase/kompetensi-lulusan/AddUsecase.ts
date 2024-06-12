import {BadRequestError} from '../../../common/error/BadRequestError';
import {KompetensiLulusanRepository}
  from '../../../domain/kompetensi_lulusan/KompetensiLulusanRepository';
import {
  KompetensiLulusanReq,
  mapKompetensiLulusanReq,
} from '../../../domain/kompetensi_lulusan/entity/kompetensi-lulusan';
import {KompetensiOkupasiRepository}
  from '../../../domain/kompetensi_okupasi/KompetensiOkupasiRepository';
import {VerifyKompetensiInput}
  from '../../../domain/kompetensi_okupasi/entity/kompetensi-okupasi';
import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {KompetensiLulusanValidation}
  from '../../validation/KompetensiLulusanValidation';
import {Validation} from '../../validation/Validation';

export class AddKompetensiLulusanUsecase {
  constructor(
    private readonly kompetensiLulusanRepo: KompetensiLulusanRepository,
    private readonly sekolahRepo: SekolahRepository,
    private readonly okupasiRepo: OkupasiRepository,
    private readonly kompetensiOkupasiRepo: KompetensiOkupasiRepository,
  ) {}

  async execute(payload: KompetensiLulusanReq) {
    Validation.validate(KompetensiLulusanValidation.ADD, payload);

    await this.sekolahRepo.verify(payload.id);
    await this.okupasiRepo.verify(payload.kode);

    const total = await this.kompetensiLulusanRepo
        .countByKode(payload.id, payload.kode);
    if (total) {
      throw new BadRequestError('okupasi sudah ditambahkan');
    }

    // verify each of unit kompetensi
    payload.unit_kompetensi.forEach(async (v) => {
      const verifyKompetensiInput: VerifyKompetensiInput = {
        id: v.id,
        kode_okupasi: payload.kode,
      };

      await this.kompetensiOkupasiRepo.verify(verifyKompetensiInput);
    });

    await this.kompetensiLulusanRepo.add(mapKompetensiLulusanReq(payload));
  }
}
