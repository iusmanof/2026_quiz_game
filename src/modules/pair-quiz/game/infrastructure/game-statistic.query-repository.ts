import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GameStatistic } from '@modules/pair-quiz/game/domain/entites/game-statistic.entity';

@Injectable()
class GameStatisticQueryRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async findByPlayerId(userId: string) {
    return await this.dataSource
      .getRepository(GameStatistic)
      .findOne({ where: { player: { id: userId } }, relations: { player: true } });
  }
}

export default GameStatisticQueryRepository;
