import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Game } from '@modules/pair-quiz/game/domain/entites/game.entity';
import { GameStatus } from '@modules/pair-quiz/game/domain/enums/game-status.enum';
import {
  GameQueryParamsDto,
  GameSortBy,
} from '@modules/bloggers-platform/blogs/api/dto/game-query-params.dto';
import { SortDirection } from '@core/dto/base.query-params.dto';

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
    const {
      pageSize = 10,
      sortBy = GameSortBy.PairCreatedDate,
      sortDirection = SortDirection.Desc,
    } = queryParams;

    const qb = this.dataSource
      .getRepository(Game)
      .createQueryBuilder('game')

      .leftJoinAndSelect('game.firstPlayerProgress', 'firstPlayerProgress')
      .leftJoinAndSelect('firstPlayerProgress.playerAccount', 'firstPlayerAccount')
      .leftJoinAndSelect('firstPlayerProgress.answers', 'firstPlayerAnswers')

      .leftJoinAndSelect('game.secondPlayerProgress', 'secondPlayerProgress')
      .leftJoinAndSelect('secondPlayerProgress.playerAccount', 'secondPlayerAccount')
      .leftJoinAndSelect('secondPlayerProgress.answers', 'secondPlayerAnswers')

      .leftJoinAndSelect('game.gameQuestions', 'gameQuestions')
      .leftJoinAndSelect('gameQuestions.question', 'question')

      .where('firstPlayerAccount.id = :userId', { userId })
      .orWhere('secondPlayerAccount.id = :userId', { userId });

    if (sortBy !== GameSortBy.PairCreatedDate) {
      qb.addOrderBy('game.pairCreatedDate', 'DESC');
    }

    qb.skip(queryParams.calculateSkip()).take(pageSize);

    const [items, totalCount] = await qb.getManyAndCount();

    return { items, totalCount };
  }
}

export default GameQueryRepository;
