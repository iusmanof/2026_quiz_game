import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import QuestionQueryRepository from '@modules/pair-quiz/questions/infrastructure/question.query-repository';

export class GetQuestionByIdQuery {
  constructor(public id: number) {}
}

@QueryHandler(GetQuestionByIdQuery)
export class GetQuestionByIdQueryHandler implements IQueryHandler<GetQuestionByIdQuery> {
  constructor(private readonly questionQueryRepository: QuestionQueryRepository) {}

  async execute(query: GetQuestionByIdQuery) {
    const question = await this.questionQueryRepository.getById(query.id);

    if (!question) {
      throw new Error(`Question with id ${query.id} not found`);
    }

    return question;
  }
}
