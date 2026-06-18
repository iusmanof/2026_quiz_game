import { AnswerStatus } from '@modules/pair-quiz/game/domain/player-answer.entity';

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
  questions: IQuestion[];
  status: string;
  pairCreatedDate: Date;
  startGameDate: Date | null;
  finishGameDate: Date | null;
}
