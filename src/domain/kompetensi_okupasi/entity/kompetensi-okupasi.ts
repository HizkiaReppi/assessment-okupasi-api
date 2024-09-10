import {v4 as uuid} from 'uuid';

export type AddKompetensiOkupasiReq = {
  kode_okupasi: string
  kode_unit: string
  nama: string
  standard_kompetensi?: string
}

export type AddKompetensiOkupasiInput = {
  id: string
  kode_okupasi: string
  kode_unit: string
  nama: string
  standard_kompetensi?: string
}

export type EditKompetensiOkupasiReq = {
  id: string
  kode_okupasi: string
  kode_unit: string
  nama: string
  standard_kompetensi: string
}

export type EditKompetensiOkupasiInput = {
  kode_unit: string
  nama: string
  standard_kompetensi: string
}

export type DeleteKompetensiOkupasiReq = {
  id: string
  kode_okupasi: string
}

export type VerifyKompetensiInput = {
  id: string
  kode_okupasi: string
}

export type VerifyAllKompetensiInput = {
  kode_okupasi: string
  ids: string[]
}

export type VerifyKompetensiByKodeAndNamaInput = {
  kode_okupasi: string
  nama: string
}

export function mapAddKompetensiOkupasiReq(
    req: AddKompetensiOkupasiReq,
): AddKompetensiOkupasiInput {
  return {
    id: uuid(),
    kode_okupasi: req.kode_okupasi,
    kode_unit: req.kode_unit,
    nama: req.nama,
    standard_kompetensi: req.standard_kompetensi,
  };
}

export function mapEditKompetensiOkupasiReq(
    req: EditKompetensiOkupasiReq,
): EditKompetensiOkupasiInput {
  return {
    kode_unit: req.kode_unit,
    nama: req.nama,
    standard_kompetensi: req.standard_kompetensi,
  };
}
