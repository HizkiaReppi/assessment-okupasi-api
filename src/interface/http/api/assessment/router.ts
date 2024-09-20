import express from 'express';
import {prismaClient} from '../../../../infrastructure/database/prisma';
import {AssessmentHandler} from './handler';
import {authenticationMiddleware} from '../../middleware/authentication';
import {AssessmentRepositoryImpl}
  from '../../../../infrastructure/repository/AssessmentRepositoryImpl';
import {AddAssessmentUsecase}
  from '../../../../application/usecase/assessment/AddUsecase';
import {GetAllAssessmentUsecase}
  from '../../../../application/usecase/assessment/GetAllUsecase';
import {EditAssessmentByIdUsecase}
  from '../../../../application/usecase/assessment/EditByIdUsecase';
import {DeleteAssessmentByIdUsecase}
  from '../../../../application/usecase/assessment/DeleteByIdUsecase';

export function assessmentRouter() {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  // repo
  const assessmentRepo = new AssessmentRepositoryImpl(prismaClient);

  // usecase
  const addAssessmentUsecase = new AddAssessmentUsecase(assessmentRepo);
  const getAllAssessmentUsecase = new GetAllAssessmentUsecase(assessmentRepo);
  const editAssessmentByIdUsecase = new EditAssessmentByIdUsecase(
      assessmentRepo,
  );
  const deleteAssessmentByIdUsecase = new DeleteAssessmentByIdUsecase(
      assessmentRepo,
  );

  const handler = new AssessmentHandler(
      addAssessmentUsecase,
      getAllAssessmentUsecase,
      editAssessmentByIdUsecase,
      deleteAssessmentByIdUsecase,
  );

  // routes
  router.route('/assessment')
      .post(authenticationMiddleware, handler.add)
      .get(handler.getAll);
  router.route('/assessment/:id')
      .put(authenticationMiddleware, handler.editById)
      .delete(authenticationMiddleware, handler.deleteById);

  return router;
}
