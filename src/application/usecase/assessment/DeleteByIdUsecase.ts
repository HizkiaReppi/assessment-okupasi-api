import {AssessmentRepository}
  from '../../../domain/assessment/AssessmentRepository';
import {AssessmentValidation} from '../../validation/AssessmentValidation';
import {Validation} from '../../validation/Validation';

export class DeleteAssessmentByIdUsecase {
  constructor(private readonly assessmentRepo: AssessmentRepository) {}

  async execute(id: string) {
    Validation.validate(AssessmentValidation.DELETE_BY_ID, id);

    await this.assessmentRepo.verify(id);
    await this.assessmentRepo.deleteById(id);
  }
}
