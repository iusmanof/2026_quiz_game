import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import GameRepository from '@modules/pair-quiz/game/infrastructure/game.repository';
import { ForbiddenException } from '@nestjs/common';

export class SendAnswerForNextCommand {
  constructor(
    public userId: string,
    public answer: string,
  ) {}
}

@CommandHandler(SendAnswerForNextCommand)
export class SendAnswerForNextUseCase implements ICommandHandler<SendAnswerForNextCommand> {
  constructor(private readonly gameRepository: GameRepository) {}
  async execute(command: SendAnswerForNextCommand) {
    const game = await this.gameRepository.findCurrentGameByUserId(command.userId);
    console.log('CURRENT GAME', {
      id: game?.id,
      status: game?.status,
    });

    if (!game) {
      throw new ForbiddenException();
    }

    const playerProgress = game.getPlayerProgress(command.userId);
    if (!playerProgress) {
      throw new ForbiddenException();
    }
    console.log(
      game.questions?.map((q, i) => ({
        index: i,
        id: q.id,
      })),
    );

    console.log(playerProgress.answers.map((a) => a.questionId));
    const nextQuestion = game.getNextQuestionForPlayer(playerProgress);

    if (!nextQuestion) {
      throw new ForbiddenException();
    }

    const result = game.answerQuestion(playerProgress, nextQuestion, command.answer);

    console.log({
      gameId: game.id,
      status: game.status,
      firstAnswers: game.firstPlayerProgress.answers.length,
      secondAnswers: game.secondPlayerProgress?.answers.length,
      firstScore: game.firstPlayerProgress.score,
      secondScore: game.secondPlayerProgress?.score,
    });

    await this.gameRepository.save(game);

    return {
      questionId: result.questionId,
      answerStatus: result.answerStatus,
      addedAt: result.addedAt,
    };
  }
}
