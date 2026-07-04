import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import GameRepository from '@modules/pair-quiz/game/infrastructure/game.repository';
import { Game } from '@modules/pair-quiz/game/domain/entites/game.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import UsersRepository from '@user-accounts/infrastructure/users.repository';
import { GameMapper } from '@modules/pair-quiz/game/api/mappers/game.mapper';
import QuestionRepository from '@modules/pair-quiz/questions/infrastructure/question.repository';

export class ConnectCurrentUserCommand {
  constructor(public userId: string) {}
}

@CommandHandler(ConnectCurrentUserCommand)
export class ConnectCurrentUserUseCase implements ICommandHandler<ConnectCurrentUserCommand> {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async execute(command: ConnectCurrentUserCommand) {
    const user = await this.userRepository.findById(command.userId);

    if (!user) {
      throw new NotFoundException();
    }

    const currentGame = await this.gameRepository.findCurrentGameByUserId(command.userId);
    if (currentGame) {
      throw new ForbiddenException();
    }

    const pendingGame = await this.gameRepository.findPending();

    if (pendingGame) {
      const questions = await this.questionRepository.getRandomPublishedQuestions(5);
      pendingGame.connectSecondPlayer(user);
      pendingGame.assignQuestions(questions);
      await this.gameRepository.save(pendingGame);

      return GameMapper.toView(pendingGame);
    }

    const game = Game.createPendingGame(user);
    await this.gameRepository.save(game);
    return GameMapper.toView(game);
  }
}
