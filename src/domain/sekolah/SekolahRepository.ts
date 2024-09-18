import {
  AddSekolahInput,
  EditSekolahInput,
  GetAllSekolahInput,
  GetSekolahOutput,
} from './entity/sekolah';

export interface SekolahRepository {
  add(data: AddSekolahInput): Promise<string>
  getAll(req: GetAllSekolahInput): Promise<[number, GetSekolahOutput[]]>
  getById(id: string): Promise<GetSekolahOutput>
  editById(id: string, data: EditSekolahInput): Promise<void>
  deleteById(id: string): Promise<void>
  verify(id: string): Promise<void>
}
