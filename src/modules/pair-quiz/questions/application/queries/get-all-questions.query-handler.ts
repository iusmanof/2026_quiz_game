import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { QueryParamsDto } from '@modules/pair-quiz/questions/api/dto/query-params.dto';
import { Inject } from '@nestjs/common';
import QuestionQueryRepository from '@modules/pair-quiz/questions/infrastructure/question.query-repository';
import { PaginatedViewDto } from '@core/dto/paginated-view.dto';
import { QuestionViewDto } from '@modules/pair-quiz/questions/application/queries/dto/question-view.dto';

export class GetAllQuestionsQuery {
  constructor(public readonly queryParams: QueryParamsDto) {}
}

@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsQueryHandler implements IQueryHandler<GetAllQuestionsQuery> {
  constructor(
    @Inject(QuestionQueryRepository)
    private readonly questionsQueryRepository: QuestionQueryRepository,
  ) {}

  async execute(query: GetAllQuestionsQuery): Promise<PaginatedViewDto<QuestionViewDto>> {
    const result = await this.questionsQueryRepository.getAll(query.queryParams);
    return {
      ...result,
      items: result.items.map((item) => QuestionViewDto.mapToView(item)),
    };
  }
}
