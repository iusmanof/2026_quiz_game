import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetCurrentGamesQuery {}

@QueryHandler(GetCurrentGamesQuery)
export class GetCurrentGamesQueryHandler implements IQueryHandler<GetCurrentGamesQuery> {
  async execute(query: GetCurrentGamesQuery) {
    // TODO: Implement once repository/domain is available
  }
}
