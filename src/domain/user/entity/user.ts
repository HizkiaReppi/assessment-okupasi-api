import {Bcrypt} from '../../../infrastructure/security/Bcrypt';
import {v4 as uuid} from 'uuid';

export type AddUserReq = {
  nama: string
  email: string
  password: string
  is_super: boolean
}

export type AddUserInput = {
  id: string
  nama: string
  email: string
  password: string
  is_super: boolean
}

export type LoginReq = {
  email: string
  password: string
}

export type LoginOutput = {
  id: string
  password: string
  is_super: boolean
}

export type LoginRes = {
  access: string
  refresh: string
}

export type UserRes = {
  id: string
  nama: string
  email: string
  is_super: boolean
  created_at: Date
  updated_at: Date
}

export async function mapAddAdkunReq(req: AddUserReq): Promise<AddUserInput> {
  const password = await new Bcrypt().hash(req.password);
  return {
    id: uuid(),
    nama: req.nama,
    email: req.email,
    password: password,
    is_super: req.is_super,
  };
}
