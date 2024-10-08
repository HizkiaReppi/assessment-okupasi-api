import {Users} from '@prisma/client';
import {AddUserInput, LoginOutput} from './entity/user';

export interface UserRepository {
  add(req: AddUserInput): Promise<void>
  login(email: string): Promise<LoginOutput>
  getById(id: string): Promise<Users>
  getAll(): Promise<Users[]>
  changeEmail(id: string, email: string): Promise<void>
  changePassword(id: string, password: string): Promise<void>
  deleteById(id: string): Promise<void>
  verify(id: string): Promise<void>
}
