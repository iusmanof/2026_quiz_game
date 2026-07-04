import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@user-accounts/domain/user';
import { GameResult } from '@modules/pair-quiz/game/domain/enums/game-result.enum';

@Entity('GameStatistic')
export class GameStatistic {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  player: User;

  @Column({ type: 'int', default: 0 })
  sumScore: number;

  @Column({ type: 'int', default: 0 })
  avgScores: number;

  @Column({ type: 'int', default: 0 })
  gamesCount: number;

  @Column({ type: 'int', default: 0 })
  winsCount: number;

  @Column({ type: 'int', default: 0 })
  lossesCount: number;

  @Column({ type: 'int', default: 0 })
  drawsCount: number;

  private recalculateAverage() {
    if (this.gamesCount === 0) {
      this.avgScores = 0;
      return;
    }
    const avg = this.sumScore / this.gamesCount;

    this.avgScores = Number(avg.toFixed(2));
  }

  addGame(score: number, result: GameResult) {
    this.gamesCount += 1;
    this.sumScore += score;

    if (result === GameResult.Win) {
      this.winsCount += 1;
    }
    if (result === GameResult.Lose) {
      this.lossesCount += 1;
    }
    if (result === GameResult.Draw) {
      this.drawsCount += 1;
    }

    this.recalculateAverage();
  }
}
