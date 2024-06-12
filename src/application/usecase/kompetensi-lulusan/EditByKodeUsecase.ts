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
import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {prismaClient} from '../../../infrastructure/database/prisma';
import {KompetensiLulusanValidation}
  from '../../validation/KompetensiLulusanValidation';
import {Validation} from '../../validation/Validation';

export class EditKompetensiLulusanByKodeUsecase {
  constructor(
    private readonly kompetensiLulusanRepo: KompetensiLulusanRepository,
    private readonly sekolahRepo: SekolahRepository,
    private readonly kompetensiOkupasiRepo: KompetensiOkupasiRepository,
  ) {}

  async execute(payload: KompetensiLulusanReq) {
    Validation.validate(KompetensiLulusanValidation.EDIT, payload);

    await this.sekolahRepo.verify(payload.id);

    // verify each of unit kompetensi
    payload.unit_kompetensi.forEach(async (v) => {
      const verifyKompetensiInput: VerifyKompetensiInput = {
        id: v.id,
        kode_okupasi: payload.kode,
      };

      await this.kompetensiOkupasiRepo.verify(verifyKompetensiInput);
    });

    await prismaClient.$transaction(async (tx) => {
      await this.kompetensiLulusanRepo
          .deleteByKodeOkupasi(payload.id, payload.kode);
      await this.kompetensiLulusanRepo.add(mapKompetensiLulusanReq(payload));
    });
  }
}
