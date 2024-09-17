import {ZodType, z} from 'zod';

export class KonsentrasiValidation {
  static readonly ADD: ZodType = z
      .object({
        nama: z.string(),
      });

  static readonly EDIT_BY_ID: ZodType = z
      .object({
        id: z.string().uuid(),
        nama: z.string(),
      });

  static readonly DELETE_BY_ID: ZodType = z.string().uuid();
}
