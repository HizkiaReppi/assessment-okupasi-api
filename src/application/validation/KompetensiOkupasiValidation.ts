import {ZodType, z} from 'zod';

export class KompetensiOkupasiValidation {
  static readonly ADD: ZodType = z.object({
    kode_okupasi: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
    kode_unit: z.string().min(6),
    nama: z.string(),
    standard_kompetensi: z.string().max(250).optional(),
  });

  static readonly EDIT_BY_ID: ZodType = z.object({
    id: z.string().uuid(),
    kode_okupasi: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
    kode_unit: z.string().min(6),
    nama: z.string(),
    standard_kompetensi: z.string().max(250),
  });

  static readonly DELETE_BY_ID: ZodType = z.object({
    id: z.string().uuid(),
    kode_okupasi: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
  });
}
