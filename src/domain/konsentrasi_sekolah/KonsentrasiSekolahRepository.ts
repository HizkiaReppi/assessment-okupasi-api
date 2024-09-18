import {
  AddKonsentrasiSekolahInput,
} from './entity/konsentrasi-sekolah';

export interface KonsentrasiSekolahRepository {
  add(data: AddKonsentrasiSekolahInput[]): Promise<void>
  deleteBySekolahId(idSekolah: string): Promise<void>
}
