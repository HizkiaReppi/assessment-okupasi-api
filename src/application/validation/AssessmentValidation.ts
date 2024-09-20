import {ZodType, z} from 'zod';

export class AssessmentValidation {
  static readonly ADD: ZodType = z.object({
    title: z.string(),
    url: z.string().regex(/^(http|https):\/\//, 'link tidak valid'),
  });

  static readonly EDIT_BY_ID = z.object({
    id: z.string().uuid(),
    title: z.string(),
    url: z.string().regex(/^(http|https):\/\//, 'link tidak valid'),
  });

  static readonly DELETE_BY_ID = z.string().uuid();
}
