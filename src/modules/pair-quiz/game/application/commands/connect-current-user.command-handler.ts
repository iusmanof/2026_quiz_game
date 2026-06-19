import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import GameRepository from '@modules/pair-quiz/game/infrastructure/game.repository';
import { Game, GameStatus } from '@modules/pair-quiz/game/domain/game.entity';
import { NotFoundException } from '@nestjs/common';
import UsersRepository from '@user-accounts/infrastructure/users.repository';
import { GameMapper } from '@modules/pair-quiz/game/api/mappers/game.mapper';

export class ConnectCurrentUserCommand {
  constructor(public userId: string) {}
}

@CommandHandler(ConnectCurrentUserCommand)
export class ConnectCurrentUserUseCase implements ICommandHandler<ConnectCurrentUserCommand> {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async execute(command: ConnectCurrentUserCommand) {
    const user = await this.userRepository.findById(command.userId);

    if (!user) {
      throw new NotFoundException();
    }
    const pendingGame = await this.gameRepository.findPending();

    if (pendingGame?.status) {
      console.log('logic with two players');
      pendingGame.connectSecondPlayer(user);

      await this.gameRepository.save(pendingGame);

      return GameMapper.toView(pendingGame);
    }

    const game = Game.createPendingGame(user);

    await this.gameRepository.save(game);

    return GameMapper.toView(game);
  }
}
