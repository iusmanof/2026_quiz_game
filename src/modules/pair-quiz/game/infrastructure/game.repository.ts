import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Game } from '@modules/pair-quiz/game/domain/entites/game.entity';
import { PlayerProgress } from '@modules/pair-quiz/game/domain/entites/player-progress.entity';
import { PlayerAnswer } from '@modules/pair-quiz/game/domain/entites/player-answer.entity';
import { GameStatus } from '@modules/pair-quiz/game/domain/enums/game-status.enum';

@Injectable()
class GameRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  private sortAnswers(game: Game | null): Game | null {
    if (!game) {
      return null;
    }

    game.firstPlayerProgress.answers?.sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime());

    game.secondPlayerProgress?.answers?.sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime());

    return game;
  }

  async findById(gameId: string): Promise<Game | null> {
    return await this.dataSource.getRepository(Game).findOne({
      where: { id: gameId },
      relations: { firstPlayerProgress: true, secondPlayerProgress: true },
    });
  }
  async findPending(): Promise<Game | null> {
    const game = await this.dataSource.getRepository(Game).findOne({
      where: {
        status: GameStatus.PendingSecondPlayer,
      },
      relations: {
        firstPlayerProgress: {
          playerAccount: true,
          answers: true,
        },
        secondPlayerProgress: {
          playerAccount: true,
          answers: true,
        },
        gameQuestions: {
          question: true,
        },
      },
      order: {
        createdAt: 'ASC',
      },
    });

    return this.sortAnswers(game);
  }

  async findCurrentGameByUserId(userId: string) {
    const game = await this.dataSource.getRepository(Game).findOne({
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
        gameQuestions: {
          question: true,
        },
        firstPlayerProgress: {
          playerAccount: true,
          answers: true,
        },
        secondPlayerProgress: {
          playerAccount: true,
          answers: true,
        },
      },
    });

    return this.sortAnswers(game);
  }

  async save(game: Game): Promise<Game> {
    return this.dataSource.getRepository(Game).save(game);
  }

  async deleteAllGames() {
    await this.dataSource.createQueryBuilder().delete().from(Game).execute();
  }

  async deleteAllPlayerProgress() {
    await this.dataSource.createQueryBuilder().delete().from(PlayerProgress).execute();
  }

  async deleteAllPlayerAnswer() {
    await this.dataSource.createQueryBuilder().delete().from(PlayerAnswer).execute();
  }
}

export default GameRepository;
