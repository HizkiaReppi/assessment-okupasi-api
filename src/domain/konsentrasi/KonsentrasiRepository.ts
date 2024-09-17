import {Konsentrasi} from '@prisma/client';
import {
  AddKonsentrasiInput,
  EditKonsentrasiInput,
  GetAllKonsentrasiInput,
} from './entity/konsentrasi';

export interface KonsentrasiRepository {
  add(data: AddKonsentrasiInput): Promise<string>
  getAll(req: GetAllKonsentrasiInput): Promise<[number, Konsentrasi[]]>
  editById(id: string, data: EditKonsentrasiInput): Promise<void>
  deleteById(id: string): Promise<void>
  verify(id: string): Promise<void>
}
