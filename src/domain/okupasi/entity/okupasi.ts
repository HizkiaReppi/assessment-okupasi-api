import {v4 as uuid} from 'uuid';

export type AddOkupasiReq = {
  kode: string
  nama: string
  unit_kompetensi: {nama: string}[]
}

export type AddOkupasiInput = {
  kode: string
  nama: string
}

export type UnitKompetensiInput = {
  id: string
  nama: string
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
    nama: string
  }[]
}

export type EditOkupasiReq = {
  kode: string
  nama: string
}

export type EditOkupasiInput = {
  kode: string
  nama: string
}

export function mapAddOkupasiReq(req: AddOkupasiReq): AddOkupasiInput {
  return {
    kode: req.kode,
    nama: req.nama,
  };
}

export function mapEditOkupasiReq(req: AddOkupasiReq): AddOkupasiInput {
  return {
    kode: req.kode,
    nama: req.nama,
  };
}

export function mapAllUnitKompetensiReq(
    req: {nama: string}[],
): UnitKompetensiInput[] {
  return req.map((kompetensi) => {
    return {
      id: uuid(),
      nama: kompetensi.nama,
    };
  });
}
