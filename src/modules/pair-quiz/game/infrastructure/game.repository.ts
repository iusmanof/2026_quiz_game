import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Game, GameStatus } from '@modules/pair-quiz/game/domain/game.entity';

@Injectable()
class GameRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async findPending(): Promise<Game | null> {
    return this.dataSource.getRepository(Game).findOne({
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
        questions: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findActiveGameByUserId(userId: string): Promise<Game | null> {
    return this.dataSource
      .getRepository(Game)
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.firstPlayerProgress', 'fp')
      .leftJoinAndSelect('g.secondPlayerProgress', 'sp')
      .leftJoin('fp.playerAccount', 'fpu')
      .leftJoin('sp.playerAccount', 'spu')
      .where('g.status IN (:...statuses)', {
        statuses: [GameStatus.PendingSecondPlayer, GameStatus.Active],
      })
      .andWhere('(fpu.id = :userId OR spu.id = :userId)', {
        userId,
      })
      .getOne();
  }

  async save(game: Game): Promise<Game> {
    return this.dataSource.getRepository(Game).save(game);
  }
}

export default GameRepository;
