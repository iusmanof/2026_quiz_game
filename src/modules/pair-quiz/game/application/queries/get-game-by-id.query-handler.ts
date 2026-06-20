import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import GameQueryRepository from '@modules/pair-quiz/game/infrastructure/game.query-repository';
import { DomainException, Extension } from '@core/exceptions/filters/domain-exceptions';
import { DomainExceptionCode } from '@core/exceptions/filters/domain-exception-codes';
import { GameMapper } from '@modules/pair-quiz/game/api/mappers/game.mapper';
import { ForbiddenException } from '@nestjs/common';

export class GetGameByIdQuery {
  constructor(
    public id: string,
    public currentUserId: string,
  ) {}
}

@QueryHandler(GetGameByIdQuery)
export class GetGameByIdQueryHandler implements IQueryHandler<GetGameByIdQuery> {
  constructor(private readonly gameQueryRepository: GameQueryRepository) {}
  async execute(query: GetGameByIdQuery) {
    const game = await this.gameQueryRepository.findGameById(query.id);

    if (!game) {
      throw new DomainException({
        code: DomainExceptionCode.NotFound,
        message: 'Game not found',
        extensions: [new Extension('Game with given id does not exist', 'id')],
      });
    }

    const isParticipant =
      game.firstPlayerProgress.playerAccount.id === query.currentUserId ||
      game.secondPlayerProgress?.playerAccount.id === query.currentUserId;

    if (!isParticipant) {
      throw new ForbiddenException();
    }

    return GameMapper.toView(game);
  }
}
