import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GameTopQueryParamsDto } from '@modules/pair-quiz/game/api/dto/game-top-query-params.dto';
import GameStatisticQueryRepository from '@modules/pair-quiz/game/infrastructure/game-statistic.query-repository';
import { GameStatisticMapper } from '@modules/pair-quiz/game/api/mappers/game-statistic.mapper';

export class GetTopUsersQuery {
  constructor(public readonly queryParams: GameTopQueryParamsDto) {}
}

@QueryHandler(GetTopUsersQuery)
export class GetTopUsersQueryHandler implements IQueryHandler<GetTopUsersQuery> {
  constructor(private readonly gameStatisticQueryRepository: GameStatisticQueryRepository) {}

  async execute(query: GetTopUsersQuery) {
    const result = await this.gameStatisticQueryRepository.findTopUsers(query.queryParams);

    const items = result.items.map((item) => GameStatisticMapper.toTopUserDto(item));

    return {
      ...result,
      items,
    };
  }
}
