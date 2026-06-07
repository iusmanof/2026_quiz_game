import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerProgress } from '@modules/pair-quiz/game/domain/player-progress.entity';

@Entity('Game')
export class Game {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => PlayerProgress, (playerProgress) => playerProgress.game)
  @JoinColumn()
  playersProgress: PlayerProgress[];
}
