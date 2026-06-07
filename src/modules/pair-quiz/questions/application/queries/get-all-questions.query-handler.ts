import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetAllQuestionsQuery {
  constructor(
    public pageNumber: number = 1,
    public pageSize: number = 10,
    public sortBy: string = 'createdAt',
    public sortDirection: string = 'desc',
    public bodySearchTerm?: string,
    public publishedOnly?: boolean,
  ) {}
}

@QueryHandler(GetAllQuestionsQuery)
export class GetAllQuestionsQueryHandler implements IQueryHandler<GetAllQuestionsQuery> {
  async execute(query: GetAllQuestionsQuery) {
    // TODO: Implement once repository is available
  }
}
