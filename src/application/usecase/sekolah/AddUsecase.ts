import {KonsentrasiRepository}
  from '../../../domain/konsentrasi/KonsentrasiRepository';
import {KonsentrasiSekolahRepository}
  from '../../../domain/konsentrasi_sekolah/KonsentrasiSekolahRepository';
import {mapAddKonsentrasiSekolahReq}
  from '../../../domain/konsentrasi_sekolah/entity/konsentrasi-sekolah';
import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {
  AddSekolahReq,
  mapAddSekolahReq,
} from '../../../domain/sekolah/entity/sekolah';
import {prismaClient} from '../../../infrastructure/database/prisma';
import {removeDuplicate} from '../../../util/obj';
import {SekolahValidation} from '../../validation/SekolahValidation';
import {Validation} from '../../validation/Validation';

export class AddSekolahUsecase {
  constructor(
    private readonly sekolahRepo: SekolahRepository,
    private readonly konsentrasiRepo: KonsentrasiRepository,
    private readonly konsentrasiSekolahRepo: KonsentrasiSekolahRepository,
  ) {}

  async execute(payload: AddSekolahReq) {
    Validation.validate(SekolahValidation.ADD, payload);

    payload.konsentrasi = removeDuplicate(payload.konsentrasi);

    const konsentrasiIds = payload.konsentrasi?.map((v) => v.id);
    await this.konsentrasiRepo.verifyAll(konsentrasiIds);

    const id = await prismaClient.$transaction(async (tx) => {
      const id = await this.sekolahRepo.add(mapAddSekolahReq(payload));
      await this.konsentrasiSekolahRepo.add(mapAddKonsentrasiSekolahReq(
          id,
          payload.konsentrasi,
      ));

      return id;
    });

    return {id};
  }
}
