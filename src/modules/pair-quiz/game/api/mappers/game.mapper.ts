import { Game } from '@modules/pair-quiz/game/domain/game.entity';
import { GameViewDto } from '@modules/pair-quiz/game/api/dto/game.view-dto';

export class GameMapper {
  static toView(game: Game): GameViewDto {
    return {
      id: game.id,

      firstPlayerProgress: {
        answers: game.firstPlayerProgress.answers.map((answer) => ({
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
            answers: game.secondPlayerProgress.answers.map((answer) => ({
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
        game.questions?.map((question) => ({
          id: question.id,
          body: question.body,
        })) ?? [],

      status: game.status,

      pairCreatedDate: game.pairCreatedDate,

      startGameDate: game.startGameDate,

      finishGameDate: game.finishGameDate,
    };
  }
}
