import {ZodType, z} from 'zod';

export class KonsentrasiSekolahValidation {
  static readonly EDIT_BY_SEKOLAH_ID: ZodType = z.object({
    id: z.string().uuid(),
    konsentrasi: z.array(
        z.object({
          id: z.string().uuid(),
        }),
    ).optional(),
  });
}
