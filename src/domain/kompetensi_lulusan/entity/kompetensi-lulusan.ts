import {KompetensiOkupasi} from '@prisma/client';

export type KompetensiLulusanReq = {
  id: string
  kode: string
  unit_kompetensi: {
    id: string
  }[]
}

export type DeleteKompetensiLulusanReq = {
  id: string
  idUnit: string
}

export type KompetensiLulusanInput = {
  id_sekolah: string
  id_kompetensi_okupasi: string
}

export type GetAllKompetensiLulusanByKodeOkupasiInput = {
  search?: string
  limit: number
  page: number
  kode_okupasi: string
}

export type GetAllKompetensiLulusanByKodeOkupasiOutput = {
  id: string
  nama: string
  kota: string
  unit_kompetensi: KompetensiOkupasi[]
}

export type GetAllKompetensiLulusanByIdSekolahInput = {
  search?: string
  limit: number
  page: number
  id_sekolah: string
}

export type GetAllKompetensiLulusanByIdSekolahOutput = {
  kode: string
  nama: string
  unit_kompetensi: {
    id: string
    kode_unit: string
    nama: string
    standard_kompetensi: string
  }[]
}

export function mapKompetensiLulusanReq(
    req: KompetensiLulusanReq,
): KompetensiLulusanInput[] {
  return req.unit_kompetensi.map((v) => {
    return {
      id_sekolah: req.id,
      id_kompetensi_okupasi: v.id,
    };
  });
}

export function mapDeleteKompetensiLulusanReq(
    req: DeleteKompetensiLulusanReq,
): KompetensiLulusanInput {
  return {
    id_sekolah: req.id,
    id_kompetensi_okupasi: req.idUnit,
  };
}
