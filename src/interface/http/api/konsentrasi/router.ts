import express from 'express';
import {prismaClient} from '../../../../infrastructure/database/prisma';
import {KonsentrasiHandler} from './handler';
import {authenticationMiddleware} from '../../middleware/authentication';
import {KonsentrasiRepositoryImpl}
  from '../../../../infrastructure/repository/KonsentrasiRepositoryImpl';
import {AddKonsentrasiUsecase}
  from '../../../../application/usecase/konsentrasi/AddUsecase';
import {GetAllKonsentrasiUsecase}
  from '../../../../application/usecase/konsentrasi/GetAllUsecase';
import {EditKonsentrasiByIdUsecase}
  from '../../../../application/usecase/konsentrasi/EditByIdUsecase';
import {DeleteKonsentrasiByIdUsecase}
  from '../../../../application/usecase/konsentrasi/DeleteByIdUsecase';

export function konsentrasiRouter() {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  // repo
  const konsentrasiRepo = new KonsentrasiRepositoryImpl(prismaClient);

  // usecase
  const addKonsentrasiUsecase = new AddKonsentrasiUsecase(konsentrasiRepo);
  const getAllKonsentrasiUsecase =
    new GetAllKonsentrasiUsecase(konsentrasiRepo);
  const editKonsentrasiByIdUsecase =
    new EditKonsentrasiByIdUsecase(konsentrasiRepo);
  const deleteKonsentrasiByIdUsecase =
    new DeleteKonsentrasiByIdUsecase(konsentrasiRepo);

  const handler = new KonsentrasiHandler(
      addKonsentrasiUsecase,
      getAllKonsentrasiUsecase,
      editKonsentrasiByIdUsecase,
      deleteKonsentrasiByIdUsecase,
  );

  // routes
  router.route('/konsentrasi')
      .post(authenticationMiddleware, handler.add)
      .get(handler.getAll);
  router.route('/konsentrasi/:id')
      .put(authenticationMiddleware, handler.editById)
      .delete(authenticationMiddleware, handler.deleteById);

  return router;
}
