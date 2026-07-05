import { AnswerStatus } from '@modules/pair-quiz/game/domain/entites/player-answer.entity';

interface IAnswer {
  questionId: string;
  answerStatus: AnswerStatus;
  addedAt: string;
}

interface IPlayer {
  id: string;
  login: string;
}

interface IQuestion {
  id: string;
  body: string;
}

interface IPlayerProgress {
  answers: IAnswer[];
  player: IPlayer;
  score: number;
}

export class GameViewDto {
  id: string;
  firstPlayerProgress: IPlayerProgress;
  secondPlayerProgress: IPlayerProgress | null;
  questions: IQuestion[] | null;
  status: string;
  pairCreatedDate: Date;
  startGameDate: Date | null;
  finishGameDate: Date | null;
}


export class PaginatedGameViewDto<T> {
  items: T[];
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;

  static mapToView<T>(data: {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
  }): PaginatedGameViewDto<T> {
    return {
      pagesCount: Math.ceil(data.totalCount / data.pageSize),
      page: data.page,
      pageSize: data.pageSize,
      totalCount: data.totalCount,
      items: data.items,
    };
  }
}
