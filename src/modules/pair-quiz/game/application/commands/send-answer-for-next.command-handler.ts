import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBus } from '@nestjs/cqrs';
import GameRepository from '@modules/pair-quiz/game/infrastructure/game.repository';
import { ForbiddenException } from '@nestjs/common';
import { GameFinishedEvent } from '@modules/pair-quiz/game/application/event-handlers/game-finished-event.handler';
import { GameStatus } from '@modules/pair-quiz/game/domain/enums/game-status.enum';

export class SendAnswerForNextCommand {
  constructor(
    public userId: string,
    public answer: string,
  ) {}
}

@CommandHandler(SendAnswerForNextCommand)
class SendAnswerForNextUseCase implements ICommandHandler<SendAnswerForNextCommand> {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly eventBus: EventBus,
  ) {}
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
    if (game.status === GameStatus.Finished) {
      this.eventBus.publish(new GameFinishedEvent(game.id));
    }

    return {
      questionId: result.questionId,
      answerStatus: result.answerStatus,
      addedAt: result.addedAt,
    };
  }
}

export default SendAnswerForNextUseCase;
