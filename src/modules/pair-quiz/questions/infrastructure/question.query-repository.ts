import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryParamsDto } from '@modules/pair-quiz/questions/api/dto/query-params.dto';
import { Question } from '@modules/pair-quiz/questions/domain/question.entity';

@Injectable()
class QuestionQueryRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async getAll(query: QueryParamsDto) {
    const {
      bodySearchTerm,
      sortBy = 'createdAt',
      sortDirection = 'desc',
      pageNumber = 1,
      pageSize = 10,
    } = query;

    const queryBuilder = this.dataSource.getRepository(Question).createQueryBuilder('q');

    if (bodySearchTerm) {
      queryBuilder.andWhere('LOWER(q.body) LIKE LOWER(:search)', {
        search: `%${bodySearchTerm}%`,
      });
    }

    const totalCount = await queryBuilder.getCount();

    const items = await queryBuilder
      .select(['q.id', 'q.body', 'q.correctAnswers', 'q.createdAt', 'q.published'])
      .orderBy(`q.${sortBy}`, sortDirection.toUpperCase() as 'ASC' | 'DESC')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items,
    };
  }
}

export default QuestionQueryRepository;

// "id": "string",
//     "body": "string",
//     "correctAnswers": [
//     "string"
// ],
//     "published": false,
//     "createdAt": "2026-06-07T09:37:09.750Z",
//     "updatedAt": "2026-06-07T09:37:09.750Z"
