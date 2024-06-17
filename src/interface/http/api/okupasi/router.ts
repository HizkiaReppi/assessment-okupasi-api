import express from 'express';
import {prismaClient} from '../../../../infrastructure/database/prisma';
import {OkupasiHandler} from './handler';
import {KompetensiOkupasiRepositoryImpl}
  from '../../../../infrastructure/repository/KompetensiOkupasiRepositoryImpl';
import {GetAllOkupasiUsecase}
  from '../../../../application/usecase/okupasi/GetAllUsecase';
import {OkupasiRepositoryImpl}
  from '../../../../infrastructure/repository/OkupasiRepositoryImpl';
import {AddOkupasiUsecase}
  from '../../../../application/usecase/okupasi/AddUsecase';
import {GetOkupasiByKodeUsecase}
  from '../../../../application/usecase/okupasi/GetByKodeUsecase';
import {EditOkupasiByKodeUsecase}
  from '../../../../application/usecase/okupasi/EditByKodeUsecase';
import {DeleteOkupasiByKodeUsecase}
  from '../../../../application/usecase/okupasi/DeleteByKodeUsecase';
import {AddKompetensiOkupasiUsecase}
  from '../../../../application/usecase/kompetensi-okupasi/AddUsecase';
import {EditKompetensiOkupasiByIdUsecase}
  from '../../../../application/usecase/kompetensi-okupasi/EditByIdUsecase';
import {DeleteKompetensiOkupasiByIdUsecase}
  from '../../../../application/usecase/kompetensi-okupasi/DeleteUsecase';
import {authenticationMiddleware} from '../../middleware/authentication';

export function okupasiRouter() {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  // repo
  const okupasiRepo = new OkupasiRepositoryImpl(prismaClient);
  const kompetensiOkupasiRepo =
    new KompetensiOkupasiRepositoryImpl(prismaClient);

  // usecase
  const addOkupasiUsecase = new AddOkupasiUsecase(okupasiRepo);
  const getAllOkupasiUsecase = new GetAllOkupasiUsecase(okupasiRepo);
  const getOkupasiByKodeUsecase = new GetOkupasiByKodeUsecase(okupasiRepo);
  const editOkupasiByKodeUsecase = new EditOkupasiByKodeUsecase(okupasiRepo);
  const deleteOkupasiByKodeUsecase = new DeleteOkupasiByKodeUsecase(
      okupasiRepo,
  );
  const addKompetensiOkupasiUsecase = new AddKompetensiOkupasiUsecase(
      kompetensiOkupasiRepo,
      okupasiRepo,
  );
  const editKompetensiOkupasiByIdUsecase = new EditKompetensiOkupasiByIdUsecase(
      kompetensiOkupasiRepo,
  );
  // eslint-disable-next-line max-len
  const deleteKompetensiOkupasiByIdUsecase = new DeleteKompetensiOkupasiByIdUsecase(
      kompetensiOkupasiRepo,
  );

  const handler = new OkupasiHandler(
      addOkupasiUsecase,
      getAllOkupasiUsecase,
      getOkupasiByKodeUsecase,
      editOkupasiByKodeUsecase,
      deleteOkupasiByKodeUsecase,
      addKompetensiOkupasiUsecase,
      editKompetensiOkupasiByIdUsecase,
      deleteKompetensiOkupasiByIdUsecase,
  );

  // routes
  router.route('/okupasi')
      .post(authenticationMiddleware, handler.add)
      .get(handler.getAll);
  router.route('/okupasi/:kode')
      .get(handler.getByKode)
      .put(authenticationMiddleware, handler.editByKode)
      .delete(authenticationMiddleware, handler.deleteByKode);
  router.post(
      '/okupasi/:kode/unit-kompetensi',
      authenticationMiddleware,
      handler.addUnitKompetensi,
  );
  router.route('/okupasi/:kode/unit-kompetensi/:id')
      .put(authenticationMiddleware, handler.editUnitKompetensi)
      .delete(authenticationMiddleware, handler.deleteUnitKompetensi);

  return router;
}
