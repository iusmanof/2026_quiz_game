import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@user-accounts/domain/user';

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
}
