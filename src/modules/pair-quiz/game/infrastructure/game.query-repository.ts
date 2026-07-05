import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Game } from '@modules/pair-quiz/game/domain/entites/game.entity';
import { GameStatus } from '@modules/pair-quiz/game/domain/enums/game-status.enum';
import { GameQueryParamsDto } from '@modules/bloggers-platform/blogs/api/dto/game-query-params.dto';

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
        gameQuestions: {
          question: true,
        },
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
        gameQuestions: {
          question: true,
        },
      },
    });
  }
  async findGamesByPlayerId(
    userId: string,
    queryParams: GameQueryParamsDto,
  ): Promise<{ items: Game[]; totalCount: number }> {
    const pageNumber = queryParams.pageNumber ?? 1;
    const pageSize = queryParams.pageSize ?? 10;
    const skip = (pageNumber - 1) * pageSize;

    const sortBy = queryParams.sortBy ?? 'pairCreatedDate';
    const sortDirection = (queryParams.sortDirection ?? 'DESC').toUpperCase() as 'ASC' | 'DESC';

    const qb = this.dataSource
      .getRepository(Game)
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.firstPlayerProgress', 'fpp')
      .leftJoinAndSelect('fpp.playerAccount', 'fp')
      .leftJoinAndSelect('g.secondPlayerProgress', 'spp')
      .leftJoinAndSelect('spp.playerAccount', 'sp')
      .where('fp.id = :userId OR sp.id = :userId', { userId });

    qb.orderBy(`g.${sortBy}`, sortDirection);

    qb.skip(skip).take(pageSize);

    const [items, totalCount] = await qb.getManyAndCount();

    return {
      items,
      totalCount,
    };
  }
}

export default GameQueryRepository;
