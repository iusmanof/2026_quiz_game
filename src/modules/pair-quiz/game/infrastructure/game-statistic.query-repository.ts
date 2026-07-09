import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GameStatistic } from '@modules/pair-quiz/game/domain/entites/game-statistic.entity';
import { GameTopQueryParamsDto } from '@modules/pair-quiz/game/api/dto/game-top-query-params.dto';

@Injectable()
class GameStatisticQueryRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async findByPlayerId(userId: string) {
    return await this.dataSource
      .getRepository(GameStatistic)
      .findOne({ where: { player: { id: userId } } });
    // .findOne({ where: { player: { id: userId } }, relations: { player: true } });
  }
  async findTopUsers(queryParams: GameTopQueryParamsDto) {
    const queryBuilder = this.dataSource
      .getRepository(GameStatistic)
      .createQueryBuilder('gs')
      .leftJoinAndSelect('gs.player', 'player')
      .select([
        'gs.id',
        'gs.sumScore',
        'gs.avgScores',
        'gs.gamesCount',
        'gs.winsCount',
        'gs.lossesCount',
        'gs.drawsCount',
        'player.id',
        'player.login',
      ]);

    queryParams.sort.forEach((sort, index) => {
      const [field, direction] = sort.split(' ');
      const sortDirection: 'ASC' | 'DESC' = direction?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

      if (index === 0) {
        queryBuilder.orderBy(`gs.${field}`, sortDirection);
      }

      if (index !== 0) {
        queryBuilder.addOrderBy(`gs.${field}`, sortDirection);
      }
    });

    const pageNumber = queryParams.pageNumber;
    const pageSize = queryParams.pageSize;

    queryBuilder.skip((pageNumber - 1) * pageSize).take(pageSize);

    const [items, totalCount] = await queryBuilder.getManyAndCount();

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items,
    };
  }
}

export default GameStatisticQueryRepository;
