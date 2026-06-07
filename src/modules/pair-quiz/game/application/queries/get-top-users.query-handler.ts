import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetTopUsersQuery {}

@QueryHandler(GetTopUsersQuery)
export class GetTopUsersQueryHandler implements IQueryHandler<GetTopUsersQuery> {
  async execute(query: GetTopUsersQuery) {
    // TODO: Implement once repository/domain is available
  }
}
