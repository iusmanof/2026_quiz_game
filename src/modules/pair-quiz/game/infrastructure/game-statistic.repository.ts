import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GameStatistic } from '@modules/pair-quiz/game/domain/entites/game-statistic.entity';

@Injectable()
class GameStatisticRepository {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async save(gameStatistic: GameStatistic) {
    await this.dataSource.getRepository(GameStatistic).save(gameStatistic);
  }

  async findOrCreateByPlayerId(playerId: string): Promise<GameStatistic> {
    let stat = await this.dataSource.getRepository(GameStatistic).findOne({
      where: { player: { id: playerId } },
      relations: { player: true },
    });

    if (!stat) {
      const repo = this.dataSource.getRepository(GameStatistic);

      stat = repo.create({
        player: { id: playerId },
        sumScore: 0,
        gamesCount: 0,
        winsCount: 0,
        lossesCount: 0,
        drawsCount: 0,
      });

      await repo.save(stat);
    }

    return stat;
  }
}

export default GameStatisticRepository;
