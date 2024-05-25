import {ZodType, z} from 'zod';

export class UserValidation {
  static readonly LOGIN: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  static readonly ADD: ZodType = z.object({
    nama: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  static readonly CHANGE_EMAIL: ZodType = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
  });

  static readonly CHANGE_PASSWORD: ZodType = z.object({
    id: z.string().uuid(),
    password: z.string().min(8),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.string().uuid(),
  });
}
