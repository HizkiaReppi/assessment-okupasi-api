import {v4 as uuid} from 'uuid';

export type AddKonsentrasiReq = {
  nama: string
}

export type AddKonsentrasiInput = {
  id: string
  nama: string
}

export type GetAllKonsentrasiInput = {
  search?: string
  limit: number
  page: number
}

export type EditKonsentrasiReq = {
  id: string
  nama: string
}

export type EditKonsentrasiInput = {
  nama: string
}

export function mapAddKonsentrasiReq(
    req: AddKonsentrasiReq,
): AddKonsentrasiInput {
  return {
    id: uuid(),
    nama: req.nama.toUpperCase(),
  };
}

export function mapEditKonsentrasiReq(
    req: EditKonsentrasiReq,
): EditKonsentrasiInput {
  return {
    nama: req.nama.toUpperCase(),
  };
}
