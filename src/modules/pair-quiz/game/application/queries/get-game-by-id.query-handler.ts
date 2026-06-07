import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetGameByIdQuery {
  constructor(public id: string) {}
}

@QueryHandler(GetGameByIdQuery)
export class GetGameByIdQueryHandler implements IQueryHandler<GetGameByIdQuery> {
  async execute(query: GetGameByIdQuery) {
    // TODO: Implement once repository/domain is available
  }
}
