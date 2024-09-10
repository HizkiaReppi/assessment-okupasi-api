import {v4 as uuid} from 'uuid';

export type AddOkupasiReq = {
  kode: string
  nama: string
  unit_kompetensi: UnitKompetensiReq[]
}

export type AddOkupasiInput = {
  kode: string
  nama: string
}

export type UnitKompetensiReq = {
  kode_unit: string
  nama: string
  standard_kompetensi?: string
}

export type UnitKompetensiInput = {
  id: string
  kode_unit: string
  nama: string
  standard_kompetensi?: string
}

export type GetAllOkupasiInput = {
  search?: string
  limit: number
  page: number
}

export type GetOkupasiByKodeOutput = {
  kode: string
  nama: string
  unit_kompetensi: {
    id: string
    kode_unit: string
    nama: string
    standard_kompetensi: string
  }[]
}

export type EditOkupasiReq = {
  kode: string
  newKode: string
  nama: string
}

export type EditOkupasiInput = {
  kode: string
  nama: string
}

export function mapAddOkupasiReq(req: AddOkupasiReq): AddOkupasiInput {
  return {
    kode: req.kode,
    nama: req.nama.toUpperCase(),
  };
}

export function mapEditOkupasiReq(req: EditOkupasiReq): EditOkupasiInput {
  return {
    kode: req.newKode,
    nama: req.nama.toUpperCase(),
  };
}

export function mapAllUnitKompetensiReq(
    req: UnitKompetensiReq[],
): UnitKompetensiInput[] {
  return req.map((kompetensi) => {
    return {
      id: uuid(),
      kode_unit: kompetensi.kode_unit,
      nama: kompetensi.nama,
      standard_kompetensi: kompetensi.standard_kompetensi,
    };
  });
}
