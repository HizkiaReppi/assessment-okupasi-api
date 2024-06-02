import {v4 as uuid} from 'uuid';

export type AddSekolahReq = {
  nama: string
  kota: string
}

export type AddSekolahInput = {
  id: string
  nama: string
  kota: string
}

export type GetAllSekolahInput = {
  search?: string
  limit: number
  page: number
}

export type EditSekolahReq = {
  id: string
  nama: string
  kota: string
}

export type EditSekolahInput = {
  nama: string
  kota: string
}

export function mapAddSekolahReq(req: AddSekolahReq): AddSekolahInput {
  return {
    id: uuid(),
    nama: req.nama.toUpperCase(),
    kota: req.kota.toUpperCase(),
  };
}

export function mapEditSekolahReq(req: EditSekolahReq): EditSekolahInput {
  return {
    nama: req.nama.toUpperCase(),
    kota: req.kota.toUpperCase(),
  };
}
