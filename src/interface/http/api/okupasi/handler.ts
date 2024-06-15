import autoBind from 'auto-bind';
import {NextFunction, Request, Response} from 'express';
import {AddOkupasiUsecase}
  from '../../../../application/usecase/okupasi/AddUsecase';
import {GetAllOkupasiUsecase}
  from '../../../../application/usecase/okupasi/GetAllUsecase';
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
import {
  EditOkupasiReq,
  GetAllOkupasiInput,
} from '../../../../domain/okupasi/entity/okupasi';
import {
  AddKompetensiOkupasiReq,
  DeleteKompetensiOkupasiReq,
  EditKompetensiOkupasiReq,
} from '../../../../domain/kompetensi_okupasi/entity/kompetensi-okupasi';

export class OkupasiHandler {
  constructor(
    private readonly addOkupasiUsecase: AddOkupasiUsecase,
    private readonly getAllOkupasiUsecase: GetAllOkupasiUsecase,
    private readonly getOkupasiByKodeUsecase: GetOkupasiByKodeUsecase,
    private readonly editOkupasiByKodeUsecase: EditOkupasiByKodeUsecase,
    private readonly deleteOkupasiByKodeUsecase: DeleteOkupasiByKodeUsecase,
    private readonly addKompetensiOkupasiUsecase: AddKompetensiOkupasiUsecase,
    // eslint-disable-next-line max-len
    private readonly editKompetensiOkupasiByIdUsecase: EditKompetensiOkupasiByIdUsecase,
    // eslint-disable-next-line max-len
    private readonly deleteKompetensiOkupasiByIdUsecase: DeleteKompetensiOkupasiByIdUsecase,
  ) {
    autoBind(this);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.addOkupasiUsecase.execute(req.body);

      res.status(201).json({status: 'success', data});
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query;
      const payload: GetAllOkupasiInput = {
        search: queryParams.search as string | undefined,
        limit: parseInt(queryParams.limit as string),
        page: parseInt(queryParams.page as string),
      };
      const data = await this.getAllOkupasiUsecase.execute(payload);

      res.json({status: 'success', ...data});
    } catch (e) {
      next(e);
    }
  }

  async getByKode(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.getOkupasiByKodeUsecase.execute(req.params.kode);

      res.json({status: 'success', data});
    } catch (e) {
      next(e);
    }
  }

  async editByKode(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: EditOkupasiReq = {
        kode: req.params.kode,
        nama: req.body.nama,
      };

      await this.editOkupasiByKodeUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async deleteByKode(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteOkupasiByKodeUsecase.execute(req.params.kode);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async addUnitKompetensi(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: AddKompetensiOkupasiReq = {
        kode_okupasi: req.params.kode,
        nama: req.body.nama,
      };

      await this.addKompetensiOkupasiUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async editUnitKompetensi(req: Request, res: Response, next: NextFunction) {
    try {
      const {id, kode} = req.params;
      const payload: EditKompetensiOkupasiReq = {
        id,
        kode_okupasi: kode,
        nama: req.body.nama,
      };

      await this.editKompetensiOkupasiByIdUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async deleteUnitKompetensi(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: DeleteKompetensiOkupasiReq = {
        id: req.params.id,
        kode_okupasi: req.params.kode,
      };

      await this.deleteKompetensiOkupasiByIdUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }
}
