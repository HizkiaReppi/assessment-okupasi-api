import {Okupasi} from '@prisma/client';
import {
  AddOkupasiInput,
  UnitKompetensiInput,
  GetAllOkupasiInput,
  GetOkupasiByKodeOutput,
  EditOkupasiInput,
} from './entity/okupasi';

export interface OkupasiRepository {
  add(
    okupasi: AddOkupasiInput,
    unitKompetensi: UnitKompetensiInput[],
  ): Promise<string>
  getAll(req: GetAllOkupasiInput): Promise<[number, Okupasi[]]>
  getByKode(kode: string): Promise<GetOkupasiByKodeOutput>
  editByKode(kode: string, data: EditOkupasiInput): Promise<void>
  deleteByKode(kode: string): Promise<void>
  verify(kode: string): Promise<void>
}
