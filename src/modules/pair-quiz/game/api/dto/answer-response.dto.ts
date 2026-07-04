import { AnswerStatus } from '@modules/pair-quiz/game/domain/entites/player-answer.entity';

export class AnswerResponseDto {
  questionId: string;
  answerStatus: AnswerStatus;
  addedAt: Date;
}
