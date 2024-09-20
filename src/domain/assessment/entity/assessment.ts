import {v4 as uuid} from 'uuid';

export type AddAssessmentReq = {
  title: string
  url: string
}

export type AddAssessmentInput = {
  id: string
  title: string
  url: string
}

export type GetAllAssessmentInput = {
  search?: string
  limit: number
  page: number
}

export type GetAssessmentOutput = {
  id: string
  title: string
  url: string
}

export type EditAssessmentReq = {
  id: string
  title: string
  url: string
}

export type EditAssessmentInput = {
  title: string
  url: string
}

export function mapAddAssessmentReq(req: AddAssessmentReq): AddAssessmentInput {
  return {
    id: uuid(),
    title: req.title,
    url: req.url,
  };
}

export function mapEditAssessmentReq(
    req: EditAssessmentReq,
): EditAssessmentInput {
  return {
    title: req.title,
    url: req.url,
  };
}
