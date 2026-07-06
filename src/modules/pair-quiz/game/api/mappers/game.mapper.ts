import { Game } from '@modules/pair-quiz/game/domain/entites/game.entity';
import { GameViewDto } from '@modules/pair-quiz/game/api/dto/game.view-dto';
import { GameStatus } from '@modules/pair-quiz/game/domain/enums/game-status.enum';

export class GameMapper {
  static toView(game: Game): GameViewDto {
    return {
      id: game.id,

      firstPlayerProgress: {
        answers: (game.firstPlayerProgress.answers ?? [])
          .sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime())
          .map((answer) => ({
            questionId: answer.questionId,
            answerStatus: answer.answerStatus,
            addedAt: answer.addedAt.toISOString(),
          })),

        player: {
          id: game.firstPlayerProgress.playerAccount.id,
          login: game.firstPlayerProgress.playerAccount.login,
        },

        score: game.firstPlayerProgress.score,
      },

      secondPlayerProgress: game.secondPlayerProgress
        ? {
            answers: (game.secondPlayerProgress.answers ?? [])
              .sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime())
              .map((answer) => ({
                questionId: answer.questionId,
                answerStatus: answer.answerStatus,
                addedAt: answer.addedAt.toISOString(),
              })),

            player: {
              id: game.secondPlayerProgress.playerAccount.id,
              login: game.secondPlayerProgress.playerAccount.login,
            },

            score: game.secondPlayerProgress.score,
          }
        : null,

      questions:
        game.status === GameStatus.PendingSecondPlayer
          ? null
          : (game.gameQuestions ?? [])
              .sort((a, b) => a.order - b.order)
              .map((gq) => ({
                id: gq.question.id,
                body: gq.question.body,
              })),

      status: game.status,

      pairCreatedDate: game.pairCreatedDate,

      startGameDate: game.startGameDate,

      finishGameDate: game.finishGameDate,
    };
  }
}
