import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetCurrentUserStatisticQuery {
  constructor(public userId: string) {}
}

@QueryHandler(GetCurrentUserStatisticQuery)
export class GetCurrentUserStatisticQueryHandler implements IQueryHandler<GetCurrentUserStatisticQuery> {
  async execute(query: GetCurrentUserStatisticQuery) {
    // TODO: Implement once repository/domain is available
  }
}
