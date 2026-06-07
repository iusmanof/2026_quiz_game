import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueryParamsDto } from '@modules/pair-quiz/questions/api/dto/query-params.dto';
import { Inject } from '@nestjs/common';
import { QuestionQueryRepository } from '@modules/pair-quiz/questions/infrastructure/question.query-repository';

export class GetAllQuestionsQuery {
  constructor(public querParams: QueryParamsDto) {}
}

@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsQueryHandler implements IQueryHandler<GetAllQuestionsQuery> {
  constructor(
    @Inject(QuestionQueryRepository)
    private readonly questionsQueryRepository: QuestionQueryRepository,
  ) {}
  async execute(query: GetAllQuestionsQuery) {
    const { items, totalCount } = await this.questionsQueryRepository.getAll(query.querParams);
  }
}
