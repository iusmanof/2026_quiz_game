import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import GameRepository from '@modules/pair-quiz/game/infrastructure/game.repository';
import GameStatisticRepository from '@modules/pair-quiz/game/infrastructure/game-statistic.repository';

export class GameFinishedEvent {
  constructor(public readonly gameId: string) {}
}

@EventsHandler(GameFinishedEvent)
export class GameFinishedEventHandler implements IEventHandler<GameFinishedEvent> {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly gameStatisticRepository: GameStatisticRepository,
  ) {}
  async handle(event: GameFinishedEvent) {
    const game = await this.gameRepository.findById(event.gameId);

    if (!game) {
      return;
    }
    if (!game.secondPlayerProgress) {
      return;
    }

    const firstPlayerId = game.firstPlayerProgress.playerAccount.id;
    const firstPlayerScore = game.firstPlayerProgress.score;
    const firstPLayerResult = game.getResultForPlayer(firstPlayerId);
    const secondPlayerId = game.secondPlayerProgress.playerAccount.id;
    const secondPlayerScore = game.secondPlayerProgress.score;
    const secondPLayerResult = game.getResultForPlayer(secondPlayerId);

    const firstPlayerStatistic =
      await this.gameStatisticRepository.findOrCreateByPlayerId(firstPlayerId);
    const secondPlayerStatistic =
      await this.gameStatisticRepository.findOrCreateByPlayerId(secondPlayerId);

    firstPlayerStatistic.addGame(firstPlayerScore, firstPLayerResult);
    secondPlayerStatistic.addGame(secondPlayerScore, secondPLayerResult);

    await this.gameStatisticRepository.save(firstPlayerStatistic);
    await this.gameStatisticRepository.save(secondPlayerStatistic);
  }
}
