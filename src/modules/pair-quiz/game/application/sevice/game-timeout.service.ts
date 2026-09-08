import GameRepository from '@modules/pair-quiz/game/infrastructure/game.repository';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GameTimeoutService {
  constructor(private readonly gameRepository: GameRepository) {}
  @Cron(CronExpression.EVERY_SECOND)
  async checkTimeoutGames() {
    const games = await this.gameRepository.findGamesWaitingForTimeout();
    for (const game of games) {
      if (!game.firstPlayerFinishedAt) {
        continue;
      }

      const elapsed = Date.now() - game.firstPlayerFinishedAt.getTime();

      if (elapsed < 10_000) {
        continue;
      }

      game.finishByTimeout();

      await this.gameRepository.save(game);
    }
  }
}
