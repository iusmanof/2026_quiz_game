import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import GameQueryRepository from '@modules/pair-quiz/game/infrastructure/game.query-repository';
import { GameMapper } from '@modules/pair-quiz/game/api/mappers/game.mapper';
import { NotFoundException } from '@nestjs/common';

export class GetCurrentUnfinishedUserGameQuery {
  constructor(public userId: string) {}
}

@QueryHandler(GetCurrentUnfinishedUserGameQuery)
export class GetCurrentUnfinishedUserGameQueryHandler implements IQueryHandler<GetCurrentUnfinishedUserGameQuery> {
  constructor(private readonly gameQueryRepository: GameQueryRepository) {}
  async execute(query: GetCurrentUnfinishedUserGameQuery) {
    const game = await this.gameQueryRepository.findCurrentGameByUserId(query.userId);

    if (!game) {
      throw new NotFoundException();
    }

    return GameMapper.toView(game);
  }
}
