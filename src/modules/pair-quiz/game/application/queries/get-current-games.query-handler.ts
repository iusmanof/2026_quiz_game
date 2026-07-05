import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import GameQueryRepository from '@modules/pair-quiz/game/infrastructure/game.query-repository';
import { GameQueryParamsDto } from '@modules/bloggers-platform/blogs/api/dto/game-query-params.dto';
import { GameViewDto, PaginatedGameViewDto } from '@modules/pair-quiz/game/api/dto/game.view-dto';
import { GameMapper } from '@modules/pair-quiz/game/api/mappers/game.mapper';

export class GetCurrentGamesQuery {
  constructor(
    public readonly userId: string,
    public readonly queryParams: GameQueryParamsDto,
  ) {}
}

@QueryHandler(GetCurrentGamesQuery)
export class GetCurrentGamesQueryHandler implements IQueryHandler<GetCurrentGamesQuery> {
  constructor(private readonly gameQueryRepository: GameQueryRepository) {}

  async execute(query: GetCurrentGamesQuery): Promise<PaginatedGameViewDto<GameViewDto>> {
    const { userId, queryParams } = query;

    const { items: games, totalCount } = await this.gameQueryRepository.findGamesByPlayerId(
      userId,
      queryParams,
    );
    console.log('______________________________');
    console.log('data fron DB:');
    console.log(games);
    console.log('______________________________');

    // если хочешь стиль как в примере — можно явно маппить отдельно
    const items = games.map((game) => GameMapper.toView(game));

    console.log('+++++++++++++++++++++++++++++++');
    console.log('After mapper:');
    console.log(items);
    console.log('+++++++++++++++++++++++++++++++');

    const page = queryParams.pageNumber ?? 1;
    const pageSize = queryParams.pageSize ?? 10;

    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      items,
      totalCount,
      page,
      pageSize,
      pagesCount,
    };
  }
}
