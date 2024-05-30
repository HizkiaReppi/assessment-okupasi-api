import {
  AddKompetensiOkupasiInput,
  EditKompetensiOkupasiInput,
  VerifyKompetensiInput,
  VerifyKompetensiByKodeAndNamaInput,
} from './entity/kompetensi-okupasi';

export interface KompetensiOkupasiRepository {
  add(data: AddKompetensiOkupasiInput): Promise<string>
  editById(id: string, data: EditKompetensiOkupasiInput): Promise<void>
  deleteById(id: string): Promise<void>
  verify(req: VerifyKompetensiInput): Promise<void>
  verifyByKodeAndNama(req: VerifyKompetensiByKodeAndNamaInput): Promise<void>
}
