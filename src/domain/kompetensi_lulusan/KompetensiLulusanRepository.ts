import {
  GetAllKompetensiLulusanByKodeOkupasiInput,
  GetAllKompetensiLulusanByIdSekolahInput,
  KompetensiLulusanInput,
  GetAllKompetensiLulusanByKodeOkupasiOutput,
  GetAllKompetensiLulusanByIdSekolahOutput,
} from './entity/kompetensi-lulusan';

export interface KompetensiLulusanRepository {
  add(data: KompetensiLulusanInput): Promise<void>
  getAllByKodeOkupasi(
    req: GetAllKompetensiLulusanByKodeOkupasiInput,
): Promise<[number, GetAllKompetensiLulusanByKodeOkupasiOutput[]]>
  getAllByIdSekolah(
    req: GetAllKompetensiLulusanByIdSekolahInput,
  ): Promise<[number, GetAllKompetensiLulusanByIdSekolahOutput[]]>
  delete(req: KompetensiLulusanInput): Promise<void>
  deleteByKodeOkupasi(idSekolah: string, kode: string): Promise<void>
  verify(req: KompetensiLulusanInput): Promise<void>
}
