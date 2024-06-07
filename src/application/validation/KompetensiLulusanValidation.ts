import {ZodType, z} from 'zod';

export class KompetensiLulusanValidation {
  static readonly ADD: ZodType = z.object({
    id: z.string().uuid(),
    kode: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
    unit_kompetensi: z
        .array(
            z.object({
              id: z.string().uuid(),
            }),
        )
        .min(1, 'Required'),
  });

  static readonly EDIT: ZodType = z.object({
    id: z.string().uuid(),
    kode: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
    unit_kompetensi: z
        .array(
            z.object({
              id: z.string().uuid(),
            }),
        )
        .min(1, 'Required'),
  });

  static readonly DELETE_BY_ID: ZodType = z.object({
    id: z.string().uuid(),
    id_kompetensi_okupasi: z.string().uuid(),
  });

  static readonly DELETE_BY_KODE: ZodType = z.object({
    id: z.string().uuid(),
    kode: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
  });
}
