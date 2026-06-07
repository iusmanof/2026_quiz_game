import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetQuestionByIdQuery {
  constructor(public id: string) {}
}

@QueryHandler(GetQuestionByIdQuery)
export class GetQuestionByIdQueryHandler implements IQueryHandler<GetQuestionByIdQuery> {
  async execute(query: GetQuestionByIdQuery) {
    // TODO: Implement once repository is available
  }
}
