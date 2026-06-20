import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Game } from '@modules/pair-quiz/game/domain/game.entity';

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
}

export default GameQueryRepository;
