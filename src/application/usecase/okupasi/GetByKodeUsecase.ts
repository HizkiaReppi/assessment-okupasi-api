import {OkupasiRepository} from '../../../domain/okupasi/OkupasiRepository';
import {GetOkupasiByKodeOutput} from '../../../domain/okupasi/entity/okupasi';
import {OkupasiValidation} from '../../validation/OkupasiValidation';
import {Validation} from '../../validation/Validation';

export class GetOkupasiByKodeUsecase {
  constructor(private readonly okupasiRepo: OkupasiRepository) {}

  async execute(kode: string) {
    Validation.validate(OkupasiValidation.GET_BY_KODE, kode);

    const data = await this.okupasiRepo.getByKode(kode);

    const output: GetOkupasiByKodeOutput = {
      kode: data.kode,
      nama: data.nama,
      unit_kompetensi: data.unit_kompetensi.map((v) => {
        return {
          id: v.id,
          nama: v.nama,
        };
      }),
    };

    return output;
  }
}
