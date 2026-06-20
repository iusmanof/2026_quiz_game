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
    if (!game) {
      throw new ForbiddenException();
    }

    const playerProgress = game.getPlayerProgress(command.userId);
    if (!playerProgress) {
      throw new ForbiddenException();
    }

    const nextQuestion = game.getNextQuestionForPlayer(playerProgress);

    if (!nextQuestion) {
      throw new ForbiddenException();
    }

    const result = game.answerQuestion(playerProgress, nextQuestion, command.answer);

    await this.gameRepository.save(game);

    return {
      questionId: result.questionId,
      answerStatus: result.answerStatus,
      addedAt: result.addedAt,
    };
  }
}
