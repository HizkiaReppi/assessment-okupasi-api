import {SekolahRepository} from '../../../domain/sekolah/SekolahRepository';
import {SekolahValidation} from '../../validation/SekolahValidation';
import {Validation} from '../../validation/Validation';

export class DeleteSekolahByIdUsecase {
  constructor(private readonly sekolahRepo: SekolahRepository) {}

  async execute(id: string) {
    Validation.validate(SekolahValidation.DELETE_BY_ID, id);

    await this.sekolahRepo.verify(id);
    await this.sekolahRepo.deleteById(id);
  }
}
