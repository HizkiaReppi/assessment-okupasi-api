import {Authentication} from '@prisma/client';

export interface AuthenticationRepository {
  add(token: string, expires_at: Date): Promise<void>;
  get(token: string): Promise<Authentication>;
  delete(token: string): Promise<void>;
}
