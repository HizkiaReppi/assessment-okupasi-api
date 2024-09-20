import autoBind from 'auto-bind';
import {NextFunction, Request, Response} from 'express';
import {AddAssessmentUsecase}
  from '../../../../application/usecase/assessment/AddUsecase';
import {GetAllAssessmentUsecase}
  from '../../../../application/usecase/assessment/GetAllUsecase';
import {EditAssessmentByIdUsecase}
  from '../../../../application/usecase/assessment/EditByIdUsecase';
import {DeleteAssessmentByIdUsecase}
  from '../../../../application/usecase/assessment/DeleteByIdUsecase';
import {
  EditAssessmentReq,
  GetAllAssessmentInput,
} from '../../../../domain/assessment/entity/assessment';

export class AssessmentHandler {
  constructor(
    private readonly addAssessmentUsecase: AddAssessmentUsecase,
    private readonly getAllAssessmentUsecase: GetAllAssessmentUsecase,
    private readonly editAssessmentByIdUsecase: EditAssessmentByIdUsecase,
    private readonly deleteAssessmentByIdUsecase: DeleteAssessmentByIdUsecase,
  ) {
    autoBind(this);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.addAssessmentUsecase.execute(req.body);

      res.status(201).json({status: 'success', data});
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query;
      const payload: GetAllAssessmentInput = {
        search: queryParams.search as string | undefined,
        limit: parseInt(queryParams.limit as string),
        page: parseInt(queryParams.page as string),
      };
      const data = await this.getAllAssessmentUsecase.execute(payload);

      res.json({status: 'success', ...data});
    } catch (e) {
      next(e);
    }
  }

  async editById(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: EditAssessmentReq = {
        id: req.params.Id,
        title: req.body.title,
        url: req.body.url,
      };

      await this.editAssessmentByIdUsecase.execute(payload);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteAssessmentByIdUsecase.execute(req.params.Id);

      res.json({status: 'success'});
    } catch (e) {
      next(e);
    }
  }
}
