import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import GameStatisticQueryRepository from '@modules/pair-quiz/game/infrastructure/game-statistic.query-repository';
import { GameStatisticMapper } from '@modules/pair-quiz/game/api/mappers/game-statistic.mapper';

export class GetCurrentUserStatisticQuery {
  constructor(public userId: string) {}
}

@QueryHandler(GetCurrentUserStatisticQuery)
export class GetCurrentUserStatisticQueryHandler implements IQueryHandler<GetCurrentUserStatisticQuery> {
  constructor(private readonly gameStatisticQueryRepository: GameStatisticQueryRepository) {}
  async execute(query: GetCurrentUserStatisticQuery) {
    const statistic = await this.gameStatisticQueryRepository.findByPlayerId(query.userId);

    if (!statistic) {
      throw new Error('Statistic not found');
    }

    return GameStatisticMapper.toView(statistic);
  }
}
