import { GameStatistic } from '@modules/pair-quiz/game/domain/entites/game-statistic.entity';
import { IGameStatistic } from '@modules/pair-quiz/game/api/dto/game-statistic.dto';

export class GameStatisticMapper {
  static toView(statistic: GameStatistic): IGameStatistic {
    return {
      sumScore: statistic.sumScore,
      avgScores: Number(statistic.avgScores),
      gamesCount: statistic.gamesCount,
      winsCount: statistic.winsCount,
      lossesCount: statistic.lossesCount,
      drawsCount: statistic.drawsCount,
    };
  }
}