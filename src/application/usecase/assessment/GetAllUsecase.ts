import {AssessmentRepository}
  from '../../../domain/assessment/AssessmentRepository';
import {GetAllAssessmentInput}
  from '../../../domain/assessment/entity/assessment';
import {Pagination} from '../../../util/pagination';

export class GetAllAssessmentUsecase {
  constructor(private readonly assessmentRepo: AssessmentRepository) {}

  async execute(payload: GetAllAssessmentInput) {
    payload.limit = payload.limit ? payload.limit : 10;
    payload.page = payload.page ? payload.page : 1;

    const [totalResult, data] = await this.assessmentRepo.getAll(payload);

    const {limit, page} = payload;

    return new Pagination({limit, page, totalResult, data});
  }
}
