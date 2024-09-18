import {KonsentrasiSekolahRepository}
  from '../../../domain/konsentrasi_sekolah/KonsentrasiSekolahRepository';
import {KonsentrasiRepository}
  from '../../../domain/konsentrasi/KonsentrasiRepository';
import {
  EditKonsentrasiSekolahReq,
  mapAddKonsentrasiSekolahReq,
} from '../../../domain/konsentrasi_sekolah/entity/konsentrasi-sekolah';
import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {removeDuplicate} from '../../../util/obj';
import {prismaClient} from '../../../infrastructure/database/prisma';
import {KonsentrasiSekolahValidation}
  from '../../validation/KonsentrasiSekolahValidation';
import {Validation} from '../../validation/Validation';

export class EditKonsentrasiSekolahBySekolahIdUsecase {
  constructor(
    private readonly konsentrasiSekolahRepo: KonsentrasiSekolahRepository,
    private readonly sekolahRepo: SekolahRepository,
    private readonly konsentrasiRepo: KonsentrasiRepository,
  ) {}

  async execute(payload: EditKonsentrasiSekolahReq) {
    Validation.validate(
        KonsentrasiSekolahValidation.EDIT_BY_SEKOLAH_ID,
        payload,
    );

    await this.sekolahRepo.verify(payload.id);

    payload.konsentrasi = removeDuplicate(payload.konsentrasi);

    const konsentrasiIds = payload.konsentrasi?.map((v) => v.id);
    await this.konsentrasiRepo.verifyAll(konsentrasiIds);

    await prismaClient.$transaction(async (tx) => {
      await this.konsentrasiSekolahRepo.deleteBySekolahId(payload.id);
      await this.konsentrasiSekolahRepo.add(mapAddKonsentrasiSekolahReq(
          payload.id,
          payload.konsentrasi,
      ));
    });
  }
}
