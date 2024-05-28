import {ZodType, z} from 'zod';

export class OkupasiValidation {
  static readonly ADD: ZodType = z.object({
    kode: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
    nama: z.string(),
    unit_kompetensi: z.array(
        z.object({
          nama: z.string(),
        }),
    ),
  });

  static readonly GET_BY_KODE = z
      .string()
      .regex(/^[0-9]+$/, 'kode harus berupa angka');

  static readonly EDIT_BY_KODE = z.object({
    kode: z.string().regex(/^[0-9]+$/, 'kode harus berupa angka'),
    nama: z.string(),
  });

  static readonly DELETE_BY_KODE = z
      .string()
      .regex(/^[0-9]+$/, 'kode harus berupa angka');
}
