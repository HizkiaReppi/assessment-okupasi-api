import {
  GetAllKompetensiLulusanByIdSekolahInput,
  KompetensiLulusanInput,
  GetAllKompetensiLulusanByIdSekolahOutput,
} from './entity/kompetensi-lulusan';

export interface KompetensiLulusanRepository {
  add(data: KompetensiLulusanInput[]): Promise<void>
  getAllByIdSekolah(
    req: GetAllKompetensiLulusanByIdSekolahInput,
  ): Promise<[number, GetAllKompetensiLulusanByIdSekolahOutput[]]>
  delete(req: KompetensiLulusanInput): Promise<void>
  deleteByKodeOkupasi(idSekolah: string, kode: string): Promise<void>
  verify(req: KompetensiLulusanInput): Promise<void>
  countByKode(idSekolah: string, kode: string): Promise<number>
}
