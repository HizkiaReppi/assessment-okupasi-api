import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {calculatePercentage} from '../../../util/percentage';
import {SekolahValidation} from '../../validation/SekolahValidation';
import {Validation} from '../../validation/Validation';

export class GetSekolahByIdUsecase {
  constructor(private readonly sekolahRepo: SekolahRepository) {}

  async execute(id: string) {
    Validation.validate(SekolahValidation.GET_BY_ID, id);

    const res = await this.sekolahRepo.getById(id);
    const data = {
      ...res,
      persentase_kelulusan: calculatePercentage(
          res.jumlah_kelulusan,
          res.jumlah_siswa,
      ),
    };

    return data;
  }
}
