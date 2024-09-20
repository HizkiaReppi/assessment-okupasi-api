import {PrismaClient} from '@prisma/client';
import {countOffset} from '../../util/pagination';
import {NotFoundError} from '../../common/error/NotFoundError';
import {AssessmentRepository}
  from '../../domain/assessment/AssessmentRepository';
import {
  AddAssessmentInput,
  EditAssessmentInput,
  GetAllAssessmentInput,
  GetAssessmentOutput,
} from '../../domain/assessment/entity/assessment';
import {isPrismaError} from '../../common/error/prisma-error';

export class AssessmentRepositoryImpl implements AssessmentRepository {
  constructor(private readonly db: PrismaClient) {}
  async add(
      data: AddAssessmentInput,
  ): Promise<string> {
    try {
      const res = await this.db.assessment.create({data});

      return res.id;
    } catch (e) {
      isPrismaError(e);

      throw e;
    }
  }

  async getAll(
      req: GetAllAssessmentInput,
  ): Promise<[number, GetAssessmentOutput[]]> {
    const where = {
      title: {
        contains: req.search,
        mode: 'insensitive' as 'insensitive',
      },
    };

    return await Promise.all([
      this.db.assessment.count({where}),
      this.db.assessment.findMany({
        where,
        skip: countOffset(req.page, req.limit),
        take: req.limit,
      }),
    ]);
  }

  async editById(id: string, data: EditAssessmentInput): Promise<void> {
    try {
      await this.db.assessment.update({where: {id}, data});
    } catch (e) {
      isPrismaError(e);

      throw e;
    }
  }

  async deleteById(id: string): Promise<void> {
    await this.db.assessment.delete({where: {id}});
  }

  async verify(id: string): Promise<void> {
    const res = await this.db.assessment.count({where: {id}});
    if (!res) {
      throw new NotFoundError('assessment tidak ditemukan');
    }
  }
}
