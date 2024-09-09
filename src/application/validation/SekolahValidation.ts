import {ZodType, z} from 'zod';

export class SekolahValidation {
  static readonly ADD: ZodType = z
      .object({
        nama: z.string(),
        kota: z.string(),
        jumlah_siswa: z.number().optional(),
        jumlah_kelulusan: z.number().optional(),
      })
      .refine(
          (schema) => {
            if (!schema.jumlah_siswa || !schema.jumlah_kelulusan) {
              return true;
            }

            return schema.jumlah_kelulusan <= schema.jumlah_siswa;
          },
          'jumlah kelulusan tidak boleh melebihi jumlah siswa',
      );

  static readonly GET_BY_ID: ZodType = z.string().uuid();

  static readonly EDIT_BY_ID: ZodType = z
      .object({
        id: z.string().uuid(),
        nama: z.string(),
        kota: z.string(),
        jumlah_siswa: z.number(),
        jumlah_kelulusan: z.number(),
      })
      .refine(
          (schema) => {
            if (!schema.jumlah_siswa || !schema.jumlah_kelulusan) {
              return true;
            }

            return schema.jumlah_kelulusan <= schema.jumlah_siswa;
          },
          'jumlah kelulusan tidak boleh melebihi jumlah siswa',
      );

  static readonly DELETE_BY_ID: ZodType = z.string().uuid();
}
