import {KompetensiLulusanRepository}
  from '../../../domain/kompetensi_lulusan/KompetensiLulusanRepository';
import {
  KompetensiLulusanReq,
  mapKompetensiLulusanReq,
} from '../../../domain/kompetensi_lulusan/entity/kompetensi-lulusan';
import {KompetensiOkupasiRepository}
  from '../../../domain/kompetensi_okupasi/KompetensiOkupasiRepository';
import {VerifyAllKompetensiInput}
  from '../../../domain/kompetensi_okupasi/entity/kompetensi-okupasi';
import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {prismaClient} from '../../../infrastructure/database/prisma';
import {KompetensiLulusanValidation}
  from '../../validation/KompetensiLulusanValidation';
import {Validation} from '../../validation/Validation';

export class EditKompetensiLulusanByKodeUsecase {
  constructor(
    private readonly kompetensiLulusanRepo: KompetensiLulusanRepository,
    private readonly sekolahRepo: SekolahRepository,
    private readonly okupasiRepo: OkupasiRepository,
    private readonly kompetensiOkupasiRepo: KompetensiOkupasiRepository,
  ) {}

  async execute(payload: KompetensiLulusanReq) {
    Validation.validate(KompetensiLulusanValidation.EDIT, payload);

    await this.sekolahRepo.verify(payload.id);
    await this.okupasiRepo.verify(payload.kode);

    // verify all unit kompetensi
    const verifyAllKompetensiInput: VerifyAllKompetensiInput = {
      kode_okupasi: payload.kode,
      ids: payload.unit_kompetensi.map((unit) => unit.id),
    };
    await this.kompetensiOkupasiRepo.verifyAll(verifyAllKompetensiInput);

    await prismaClient.$transaction(async (tx) => {
      await this.kompetensiLulusanRepo
          .deleteByKodeOkupasi(payload.id, payload.kode);
      await this.kompetensiLulusanRepo.add(mapKompetensiLulusanReq(payload));
    });
  }
}
