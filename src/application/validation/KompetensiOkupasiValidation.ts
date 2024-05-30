import {ZodType, z} from 'zod';

export class KompetensiOkupasiValidation {
  static readonly ADD: ZodType = z.object({
    kode_okupasi: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
    nama: z.string(),
  });

  static readonly EDIT_BY_ID: ZodType = z.object({
    id: z.string().uuid(),
    kode_okupasi: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
    nama: z.string(),
  });

  static readonly DELETE_BY_ID: ZodType = z.object({
    id: z.string().uuid(),
    kode_okupasi: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
  });
}
