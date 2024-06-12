import {Sekolah} from '@prisma/client';
import {
  AddSekolahInput,
  EditSekolahInput,
  GetAllSekolahInput,
} from './entity/sekolah';

export interface SekolahRepository {
  add(data: AddSekolahInput): Promise<string>
  getAll(req: GetAllSekolahInput): Promise<[number, Sekolah[]]>
  getById(id: string): Promise<Sekolah>
  editById(id: string, data: EditSekolahInput): Promise<void>
  deleteById(id: string): Promise<void>
  verify(id: string): Promise<void>
}
