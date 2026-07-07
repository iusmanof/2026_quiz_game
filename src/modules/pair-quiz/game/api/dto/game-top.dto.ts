import { IGameStatistic } from '@modules/pair-quiz/game/api/dto/game-statistic.dto';

export interface IGameTop extends IGameStatistic{
  player: { id: string; login: string };
}
