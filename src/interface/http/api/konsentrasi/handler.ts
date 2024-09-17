import autoBind from 'auto-bind';
import {NextFunction, Request, Response} from 'express';
import {AddKonsentrasiUsecase}
  from '../../../../application/usecase/konsentrasi/AddUsecase';
import {GetAllKonsentrasiUsecase}
  from '../../../../application/usecase/konsentrasi/GetAllUsecase';
import {EditKonsentrasiByIdUsecase}
  from '../../../../application/usecase/konsentrasi/EditByIdUsecase';
import {DeleteKonsentrasiByIdUsecase}
  from '../../../../application/usecase/konsentrasi/DeleteByIdUsecase';
import {
  EditKonsentrasiReq,
  GetAllKonsentrasiInput,
} from '../../../../domain/konsentrasi/entity/konsentrasi';

export class KonsentrasiHandler {
  constructor(
    private readonly addKonsentrasiUsecase: AddKonsentrasiUsecase,
    private readonly getAllKonsentrasiUsecase: GetAllKonsentrasiUsecase,
    private readonly editKonsentrasiByIdUsecase: EditKonsentrasiByIdUsecase,
    private readonly deleteKonsentrasiByIdUsecase: DeleteKonsentrasiByIdUsecase,
  ) {
    autoBind(this);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.addKonsentrasiUsecase.execute(req.body);

      res.status(201).json({status: 'success', data});
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query;
      const payload: GetAllKonsentrasiInput = {
        search: queryParams.search as string | undefined,
        limit: parseInt(queryParams.limit as string),
        page: parseInt(queryParams.page as string),
      };
      const data = await this.getAllKonsentrasiUsecase.execute(payload);

      res.json({status: 'success', ...data});
    } catch (e) {
      next(e);
    }
  }

  async editById(req: Request, res: Response, next: NextFunction) {
    try {
      const {nama} = req.body;
      const payload: EditKonsentrasiReq = {
        id: req.params.id,
        nama,
      };
      await this.editKonsentrasiByIdUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteKonsentrasiByIdUsecase.execute(req.params.id);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }
}
