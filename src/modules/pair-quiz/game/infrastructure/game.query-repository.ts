import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Game } from '@modules/pair-quiz/game/domain/entites/game.entity';
import { GameStatus } from '@modules/pair-quiz/game/domain/enums/game-status.enum';

@Injectable()
class GameQueryRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async findGameById(id: string) {
    return this.dataSource.getRepository(Game).findOne({
      where: { id },
      relations: {
        firstPlayerProgress: {
          answers: true,
          playerAccount: true,
        },
        secondPlayerProgress: { answers: true, playerAccount: true },
        questions: true,
      },
    });
  }

  async findCurrentGameByUserId(userId: string): Promise<Game | null> {
    return this.dataSource.getRepository(Game).findOne({
      where: [
        {
          status: GameStatus.PendingSecondPlayer,
          firstPlayerProgress: {
            playerAccount: {
              id: userId,
            },
          },
        },
        {
          status: GameStatus.Active,
          firstPlayerProgress: {
            playerAccount: {
              id: userId,
            },
          },
        },
        {
          status: GameStatus.Active,
          secondPlayerProgress: {
            playerAccount: {
              id: userId,
            },
          },
        },
      ],
      relations: {
        firstPlayerProgress: {
          answers: true,
          playerAccount: true,
        },
        secondPlayerProgress: {
          answers: true,
          playerAccount: true,
        },
        questions: true,
      },
    });
  }
}

export default GameQueryRepository;
