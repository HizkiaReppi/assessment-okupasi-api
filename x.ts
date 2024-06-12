import {prismaClient} from './src/infrastructure/database/prisma';
import {KompetensiLulusanRepositoryImpl} from './src/infrastructure/repository/KompetensiLulusanRepositoryImpl';
import { OkupasiRepositoryImpl} from './src/infrastructure/repository/OkupasiRepositoryImpl';
import { SekolahRepositoryImpl} from './src/infrastructure/repository/SekolahRepositoryImpl';
import { KompetensiOkupasiRepositoryImpl} from './src/infrastructure/repository/KompetensiOkupasiRepositoryImpl';
import {GetSekolahStatUsecase} from './src/application/usecase/sekolah/GetSekolahStatUsecase';
import { GetOkupasiByKodeUsecase } from './src/application/usecase/okupasi/GetByKodeUsecase';
import { AddKompetensiLulusanUsecase } from './src/application/usecase/kompetensi-lulusan/AddUsecase';
import { DeleteKompetensiLulusanByKodeUsecase } from './src/application/usecase/kompetensi-lulusan/DeleteByKodeUsecase';
import { EditKompetensiLulusanByKodeUsecase } from './src/application/usecase/kompetensi-lulusan/EditByKodeUsecase';
import { KompetensiLulusanReq } from './src/domain/kompetensi_lulusan/entity/kompetensi-lulusan';
import {v4} from 'uuid';
(async () => {
  const repo = new KompetensiLulusanRepositoryImpl(prismaClient);
  const sekolahRepo = new SekolahRepositoryImpl(prismaClient);
  const okupasiRepo = new OkupasiRepositoryImpl(prismaClient);
  const kompetensiOkupasiRepo = new KompetensiOkupasiRepositoryImpl(prismaClient);
  const okuUsecase = new GetOkupasiByKodeUsecase(okupasiRepo);
  const delUsecase = new DeleteKompetensiLulusanByKodeUsecase(repo);
  const editUsecase = new EditKompetensiLulusanByKodeUsecase(repo, sekolahRepo, kompetensiOkupasiRepo);

  await editUsecase.execute({id: '1', kode: '1', unit_kompetensi: [{id: '1'}]});
  // await delUsecase.execute({id: '3', kode: '2'});
  // const x = new GetSekolahStatUsecase(
  //     sekolahRepo, repo, okupasiRepo, okuUsecase);
  // const data = await x.execute({limit: 10, page: 1});
  // await repo.deleteByKodeOkupasi('2342', '1221');
  // const addUsecase = new AddKompetensiLulusanUsecase(repo,
  //     sekolahRepo, okupasiRepo, kompetensiOkupasiRepo,
  // );
  // const xx = [
  //   {
  //     id_sekolah: '1',
  //     id_kompetensi_okupasi: '3',
  //   },
  //   {
  //     id_sekolah: '1',
  //     id_kompetensi_okupasi: '3',
  //   },
  // ];
  // // await repo.add(xx);
  // const input: KompetensiLulusanReq = {
  //   kode: '',
  //   idSekolah: v4(),
  //   unit_kompetensi: [],
  // };
  // await addUsecase.execute(input);
  const data = await repo.getAllByIdSekolah({limit: 10, page: 1, id_sekolah: '1'});
  console.log(data);
  console.log(data[1][0].unit_kompetensi);
  // console.log(data1[1][0]);
})();
