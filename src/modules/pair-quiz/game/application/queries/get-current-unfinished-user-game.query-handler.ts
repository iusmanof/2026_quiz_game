import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetCurrentUnfinishedUserGameQuery {}

@QueryHandler(GetCurrentUnfinishedUserGameQuery)
export class GetCurrentUnfinishedUserGameQueryHandler
  implements IQueryHandler<GetCurrentUnfinishedUserGameQuery>
{
  async execute(query: GetCurrentUnfinishedUserGameQuery) {
    // TODO: Implement once repository/domain is available
  }
}
