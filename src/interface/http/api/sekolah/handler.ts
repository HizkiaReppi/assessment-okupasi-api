import autoBind from 'auto-bind';
import {NextFunction, Request, Response} from 'express';
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
import {
  EditSekolahReq,
  GetAllSekolahInput,
  GetSekolahStatInput,
} from '../../../../domain/sekolah/entity/sekolah';
import {
  DeleteKompetensiLulusanReq,
  GetAllKompetensiLulusanByIdSekolahInput,
  KompetensiLulusanReq,
} from '../../../../domain/kompetensi_lulusan/entity/kompetensi-lulusan';

export class SekolahHandler {
  constructor(
    private readonly addSekolahUsecase: AddSekolahUsecase,
    private readonly getAllSekolahUsecase: GetAllSekolahUsecase,
    private readonly getSekolahByIdUsecase: GetSekolahByIdUsecase,
    private readonly editSekolahByIdUsecase: EditSekolahByIdUsecase,
    private readonly deleteSekolahByIdUsecase: DeleteSekolahByIdUsecase,
    private readonly addKompetensiLulusanUsecase: AddKompetensiLulusanUsecase,
    // eslint-disable-next-line max-len
    private readonly getAllKompetensiLulusanUsecase: GetAllKompetensiLulusanUsecase,
    // eslint-disable-next-line max-len
    private readonly editKompetensiLulusanByKodeUsecase: EditKompetensiLulusanByKodeUsecase,
    // eslint-disable-next-line max-len
    private readonly deleteKompetensiLulusanByKodeUsecase: DeleteKompetensiLulusanByKodeUsecase,
    // eslint-disable-next-line max-len
    private readonly deleteKompetensiLulusanByIdUsecase: DeleteKompetensiLulusanByIdUsecase,
    private readonly getSekolahStatByKodeUsecase: GetSekolahStatUsecase,
  ) {
    autoBind(this);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.addSekolahUsecase.execute(req.body);

      res.status(201).json({status: 'success', data});
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query;
      const payload: GetAllSekolahInput = {
        search: queryParams.search as string | undefined,
        limit: parseInt(queryParams.limit as string),
        page: parseInt(queryParams.page as string),
      };
      const data = await this.getAllSekolahUsecase.execute(payload);

      res.json({status: 'success', ...data});
    } catch (e) {
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.getSekolahByIdUsecase.execute(req.params.id);

      res.json({status: 'success', data});
    } catch (e) {
      next(e);
    }
  }

  async editById(req: Request, res: Response, next: NextFunction) {
    try {
      // eslint-disable-next-line camelcase
      const {nama, kota, jumlah_siswa, jumlah_kelulusan} = req.body;
      const payload: EditSekolahReq = {
        id: req.params.id,
        nama,
        kota,
        // eslint-disable-next-line camelcase
        jumlah_siswa,
        // eslint-disable-next-line camelcase
        jumlah_kelulusan,
      };
      await this.editSekolahByIdUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteSekolahByIdUsecase.execute(req.params.id);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async addKompetensi(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: KompetensiLulusanReq = {
        id: req.params.id,
        kode: req.body.kode,
        unit_kompetensi: req.body.unit_kompetensi,
      };
      await this.addKompetensiLulusanUsecase.execute(payload);

      res.status(201).json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async getAllKompetensi(req: Request, res: Response, next: NextFunction) {
    try {
      const {search, limit, page} = req.query;
      const payload: GetAllKompetensiLulusanByIdSekolahInput = {
        search: search as string | undefined,
        limit: parseInt(limit as string),
        page: parseInt(page as string),
        id_sekolah: req.params.id,
      };
      const data = await this.getAllKompetensiLulusanUsecase.execute(payload);

      res.json({status: 'success', ...data});
    } catch (e) {
      next(e);
    }
  }

  async editKompetensi(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: KompetensiLulusanReq = {
        id: req.params.id,
        kode: req.body.kode,
        unit_kompetensi: req.body.unit_kompetensi,
      };
      await this.editKompetensiLulusanByKodeUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async deleteKompetensiByKode(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    try {
      const {id, kode} = req.params;
      const payload = {
        id,
        kode,
      };
      await this.deleteKompetensiLulusanByKodeUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async deleteKompetensiById(req: Request, res: Response, next: NextFunction) {
    try {
      const {id, idUnit} = req.params;
      const payload: DeleteKompetensiLulusanReq = {
        id,
        idUnit,
      };
      await this.deleteKompetensiLulusanByIdUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async getStatByKodeOkupasi(req: Request, res: Response, next: NextFunction) {
    try {
      const {search, limit, page} = req.query;
      const payload: GetSekolahStatInput = {
        search: search as string | undefined,
        limit: parseInt(limit as string),
        page: parseInt(page as string),
        kode_okupasi: req.params.kode,
      };
      const data = await this.getSekolahStatByKodeUsecase.execute(payload);

      res.json({status: 'success', ...data});
    } catch (e) {
      next(e);
    }
  }
}
