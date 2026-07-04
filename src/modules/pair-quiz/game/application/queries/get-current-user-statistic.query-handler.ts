import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import GameStatisticQueryRepository from '@modules/pair-quiz/game/infrastructure/game-statistic.query-repository';

export class GetCurrentUserStatisticQuery {
  constructor(public userId: string) {}
}

@QueryHandler(GetCurrentUserStatisticQuery)
export class GetCurrentUserStatisticQueryHandler implements IQueryHandler<GetCurrentUserStatisticQuery> {
  constructor(private readonly gameStatisticQueryRepository: GameStatisticQueryRepository) {
  }
  async execute(query: GetCurrentUserStatisticQuery) {
    return await this.gameStatisticQueryRepository.findByPlayerId(query.userId);
  }
}
