import {ZodType, z} from 'zod';

export class SekolahValidation {
  static readonly ADD: ZodType = z.object({
    nama: z.string(),
    kota: z.string(),
  });

  static readonly GET_BY_ID: ZodType = z.string().uuid();

  static readonly EDIT_BY_ID: ZodType = z.object({
    id: z.string().uuid(),
    nama: z.string(),
    kota: z.string(),
  });

  static readonly DELETE_BY_ID: ZodType = z.string().uuid();
}
