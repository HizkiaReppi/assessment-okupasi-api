import express from 'express';
import {prismaClient} from '../../../../infrastructure/database/prisma';
import {SekolahHandler} from './handler';
import {KompetensiOkupasiRepositoryImpl}
  from '../../../../infrastructure/repository/KompetensiOkupasiRepositoryImpl';
import {authenticationMiddleware} from '../../middleware/authentication';
import {SekolahRepositoryImpl}
  from '../../../../infrastructure/repository/SekolahRepositoryImpl';
import {AddSekolahUsecase}
  from '../../../../application/usecase/sekolah/AddUsecase';
import {GetAllSekolahUsecase}
  from '../../../../application/usecase/sekolah/GetAllUsecase';
import {GetSekolahByIdUsecase}
  from '../../../../application/usecase/sekolah/GetByIdUsecase';
import {EditSekolahByIdUsecase}
  from '../../../../application/usecase/sekolah/EditByIdUsecase';
import {DeleteSekolahByIdUsecase}
  from '../../../../application/usecase/sekolah/DeleteByIdUsecase';
import {AddKompetensiLulusanUsecase}
  from '../../../../application/usecase/kompetensi-lulusan/AddUsecase';
import {KompetensiLulusanRepositoryImpl}
  from '../../../../infrastructure/repository/KompetensiLulusanRepositoryImpl';
import {OkupasiRepositoryImpl}
  from '../../../../infrastructure/repository/OkupasiRepositoryImpl';
import {GetAllKompetensiLulusanUsecase}
  from '../../../../application/usecase/kompetensi-lulusan/GetAllUsecase';
import {EditKompetensiLulusanByKodeUsecase}
  from '../../../../application/usecase/kompetensi-lulusan/EditByKodeUsecase';
import {DeleteKompetensiLulusanByKodeUsecase}
  from '../../../../application/usecase/kompetensi-lulusan/DeleteByKodeUsecase';
import {DeleteKompetensiLulusanByIdUsecase}
  from '../../../../application/usecase/kompetensi-lulusan/DeleteByIdUsecase';
import {GetSekolahStatUsecase}
  from '../../../../application/usecase/sekolah/GetSekolahStatUsecase';
import {GetOkupasiByKodeUsecase}
  from '../../../../application/usecase/okupasi/GetByKodeUsecase';

export function sekolahRouter() {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  // repo
  const sekolahRepo = new SekolahRepositoryImpl(prismaClient);
  const kompetensiLulusanRepo = new KompetensiLulusanRepositoryImpl(
      prismaClient,
  );
  const okupasiRepo = new OkupasiRepositoryImpl(prismaClient);
  const kompetensiOkupasiRepo =
    new KompetensiOkupasiRepositoryImpl(prismaClient);

  // usecase
  const addSekolahUsecase = new AddSekolahUsecase(sekolahRepo);
  const getAllSekolahUsecase = new GetAllSekolahUsecase(sekolahRepo);
  const getSekolahByIdUsecase = new GetSekolahByIdUsecase(sekolahRepo);
  const editSekolahByIdUsecase = new EditSekolahByIdUsecase(sekolahRepo);
  const deleteSekolahByIdUsecase = new DeleteSekolahByIdUsecase(sekolahRepo);
  const addKompetensiLulusanUsecase = new AddKompetensiLulusanUsecase(
      kompetensiLulusanRepo,
      sekolahRepo,
      okupasiRepo,
      kompetensiOkupasiRepo,
  );
  const getAllKompetensiLulusanUsecase = new GetAllKompetensiLulusanUsecase(
      kompetensiLulusanRepo,
      sekolahRepo,
  );
  // eslint-disable-next-line max-len
  const editKompetensiLulusanByKodeUsecase = new EditKompetensiLulusanByKodeUsecase(
      kompetensiLulusanRepo,
      sekolahRepo,
      kompetensiOkupasiRepo,
  );
  // eslint-disable-next-line max-len
  const deleteKompetensiLulusanByKodeUsecase = new DeleteKompetensiLulusanByKodeUsecase(
      kompetensiLulusanRepo,
  );
  // eslint-disable-next-line max-len
  const deleteKompetensiLulusanByIdUsecase = new DeleteKompetensiLulusanByIdUsecase(
      kompetensiLulusanRepo,
  );
  const getOkupasiByKodeUsecase = new GetOkupasiByKodeUsecase(okupasiRepo);
  const getsekolahStatUsecase = new GetSekolahStatUsecase(
      sekolahRepo,
      kompetensiLulusanRepo,
      okupasiRepo,
      getOkupasiByKodeUsecase,
  );

  const handler = new SekolahHandler(
      addSekolahUsecase,
      getAllSekolahUsecase,
      getSekolahByIdUsecase,
      editSekolahByIdUsecase,
      deleteSekolahByIdUsecase,
      addKompetensiLulusanUsecase,
      getAllKompetensiLulusanUsecase,
      editKompetensiLulusanByKodeUsecase,
      deleteKompetensiLulusanByKodeUsecase,
      deleteKompetensiLulusanByIdUsecase,
      getsekolahStatUsecase,
  );

  // routes
  router.route('/sekolah')
      .post(authenticationMiddleware, handler.add)
      .get(handler.getAll);
  router.route('/sekolah/:id')
      .get(handler.getById)
      .put(authenticationMiddleware, handler.editById)
      .delete(authenticationMiddleware, handler.deleteById);
  router.route('/sekolah/:id/kompetensi')
      .post(authenticationMiddleware, handler.addKompetensi)
      .get(handler.getAllKompetensi)
      .put(authenticationMiddleware, handler.editKompetensi);
  router.delete(
      '/sekolah/:id/kompetensi/okupasi/:kode',
      authenticationMiddleware,
      handler.deleteKompetensiByKode,
  );
  router.delete(
      '/sekolah/:id/kompetensi/unit/:idUnit',
      authenticationMiddleware,
      handler.deleteKompetensiByKode,
  );
  router.get(
      '/sekolah/stat/okupasi/:kode',
      handler.getStatByKodeOkupasi,
  );

  return router;
}
