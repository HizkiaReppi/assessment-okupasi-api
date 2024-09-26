import {
  AddSekolahInput,
  EditSekolahInput,
  GetAllSekolahByKodeOkupasiInput,
  GetAllSekolahByKodeOkupasiOutput,
  GetAllSekolahInput,
  GetSekolahOutput,
} from './entity/sekolah';

export interface SekolahRepository {
  add(data: AddSekolahInput): Promise<string>
  getAll(req: GetAllSekolahInput): Promise<[number, GetSekolahOutput[]]>
  getAllByKodeOkupasi(
    req: GetAllSekolahByKodeOkupasiInput,
  ): Promise<[number, GetAllSekolahByKodeOkupasiOutput[]]>
  getById(id: string): Promise<GetSekolahOutput>
  editById(id: string, data: EditSekolahInput): Promise<void>
  deleteById(id: string): Promise<void>
  verify(id: string): Promise<void>
}
