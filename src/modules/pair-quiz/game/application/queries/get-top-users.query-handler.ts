import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import GameStatisticQueryRepository from '@modules/pair-quiz/game/infrastructure/game-statistic.query-repository';

export class GetTopUsersQuery {}

@QueryHandler(GetTopUsersQuery)
export class GetTopUsersQueryHandler implements IQueryHandler<GetTopUsersQuery> {
  constructor(private readonly gameStatisticQueryRepository: GameStatisticQueryRepository) {}
  async execute(query: GetTopUsersQuery) {
    return {
      pagesCount: 0,
      page: 0,
      pageSize: 0,
      totalCount: 0,
      items: [
        {
          sumScore: 0,
          avgScores: 0,
          gamesCount: 0,
          winsCount: 0,
          lossesCount: 0,
          drawsCount: 0,
          player: {
            id: 'string',
            login: 'string',
          },
        },
      ],
    };
  }
}
