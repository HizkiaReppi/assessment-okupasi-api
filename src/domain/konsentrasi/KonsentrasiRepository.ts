import {
  AddKonsentrasiInput,
  EditKonsentrasiInput,
  GetAllKonsentrasiInput,
  GetAllKonsentrasiOutput,
} from './entity/konsentrasi';

export interface KonsentrasiRepository {
  add(data: AddKonsentrasiInput): Promise<string>
  getAll(
    req: GetAllKonsentrasiInput,
  ): Promise<[number, GetAllKonsentrasiOutput[]]>
  editById(id: string, data: EditKonsentrasiInput): Promise<void>
  deleteById(id: string): Promise<void>
  verify(id: string): Promise<void>
  verifyAll(ids: string[]): Promise<void>
}
