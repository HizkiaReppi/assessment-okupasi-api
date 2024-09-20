import {
  AddAssessmentInput,
  EditAssessmentInput,
  GetAllAssessmentInput,
  GetAssessmentOutput,
} from './entity/assessment';

export interface AssessmentRepository {
  add(data: AddAssessmentInput): Promise<string>
  getAll(req: GetAllAssessmentInput): Promise<[number, GetAssessmentOutput[]]>
  editById(id: string, data: EditAssessmentInput): Promise<void>
  deleteById(id: string): Promise<void>
  verify(id: string): Promise<void>
}
