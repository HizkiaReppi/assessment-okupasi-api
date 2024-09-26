import {v4 as uuid} from 'uuid';
import {KompetensiOkupasi, Konsentrasi} from '@prisma/client';

export type AddSekolahReq = {
  nama: string
  kota: string
  jumlah_siswa?: number
  jumlah_kelulusan?: number
  konsentrasi: {id: string}[]
}

export type AddSekolahInput = {
  id: string
  nama: string
  kota: string
  jumlah_siswa?: number
  jumlah_kelulusan?: number
}

export type GetAllSekolahInput = {
  search?: string
  limit: number
  page: number
}

export type GetSekolahOutput = {
  id: string
  nama: string
  kota: string
  jumlah_siswa: number
  jumlah_kelulusan: number
  konsentrasi: {
    id: string
    nama: string
  }[]
}

export type GetAllSekolahByKodeOkupasiInput = {
  search?: string
  limit: number
  page: number
  kode_okupasi: string
}

export type GetAllSekolahByKodeOkupasiOutput = {
  id: string
  nama: string
  kota: string
  jumlah_siswa: number
  jumlah_kelulusan: number
  konsentrasi: Konsentrasi[]
  unit_kompetensi: KompetensiOkupasi[]
}

export type GetSekolahStatInput = {
  search?: string
  limit: number
  page: number
  kode_okupasi: string
}

export type GetSekolahStatOutput = {
  id: string
  nama: string
  kota: string
  jumlah_siswa: number
  jumlah_kelulusan: number
  persentase_kelulusan: string
  kecocokan: string
  konsentrasi: Konsentrasi[]
  okupasi: {
    kode: string
    nama: string
    unit_kompetensi: {
      id: string
      nama: string
    }[]
  }
}

export type EditSekolahReq = {
  id: string
  nama: string
  kota: string
  jumlah_siswa: number
  jumlah_kelulusan: number
}

export type EditSekolahInput = {
  nama: string
  kota: string
  jumlah_siswa: number
  jumlah_kelulusan: number
}

export function mapAddSekolahReq(req: AddSekolahReq): AddSekolahInput {
  return {
    id: uuid(),
    nama: req.nama.toUpperCase(),
    kota: req.kota.toUpperCase(),
    jumlah_siswa: req.jumlah_siswa,
    jumlah_kelulusan: req.jumlah_kelulusan,
  };
}

export function mapEditSekolahReq(req: EditSekolahReq): EditSekolahInput {
  return {
    nama: req.nama.toUpperCase(),
    kota: req.kota.toUpperCase(),
    jumlah_siswa: req.jumlah_siswa,
    jumlah_kelulusan: req.jumlah_kelulusan,
  };
}
