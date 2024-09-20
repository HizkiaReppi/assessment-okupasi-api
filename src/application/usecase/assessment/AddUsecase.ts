import {AssessmentRepository}
  from '../../../domain/assessment/AssessmentRepository';
import {
  AddAssessmentReq,
  mapAddAssessmentReq,
} from '../../../domain/assessment/entity/assessment';
import {AssessmentValidation} from '../../validation/AssessmentValidation';
import {Validation} from '../../validation/Validation';

export class AddAssessmentUsecase {
  constructor(private readonly assessmentRepo: AssessmentRepository) {}

  async execute(payload: AddAssessmentReq) {
    Validation.validate(AssessmentValidation.ADD, payload);

    const id = await this.assessmentRepo.add(mapAddAssessmentReq(payload));

    return {id};
  }
}
