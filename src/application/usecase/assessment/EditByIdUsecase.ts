import {AssessmentRepository}
  from '../../../domain/assessment/AssessmentRepository';
import {
  EditAssessmentReq,
  mapEditAssessmentReq,
} from '../../../domain/assessment/entity/assessment';
import {AssessmentValidation} from '../../validation/AssessmentValidation';
import {Validation} from '../../validation/Validation';

export class EditAssessmentByIdUsecase {
  constructor(private readonly assessmentRepo: AssessmentRepository) {}

  async execute(payload: EditAssessmentReq) {
    Validation.validate(AssessmentValidation.EDIT_BY_ID, payload);

    await this.assessmentRepo.verify(payload.id);
    await this.assessmentRepo.editById(
        payload.id,
        mapEditAssessmentReq(payload),
    );
  }
}
