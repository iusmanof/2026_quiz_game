import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import GameRepository from '@modules/pair-quiz/game/infrastructure/game.repository';
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

      console.log('Questions count:', questions.length);

      pendingGame.connectSecondPlayer(user);
      console.log('Second player connected');

      pendingGame.assignQuestions(questions);
      console.log('Questions assigned');

      console.log('Game before save:', {
        status: pendingGame.status,
        firstPlayerId: pendingGame.firstPlayerProgress.playerAccount.id,
        secondPlayerId: pendingGame.secondPlayerProgress?.playerAccount.id,
        questions: pendingGame.questions?.length,
      });

      await this.gameRepository.save(pendingGame);

      console.log('Game saved');
      return GameMapper.toView(pendingGame);
    }
  }
}