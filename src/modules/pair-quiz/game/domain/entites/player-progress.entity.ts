import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@user-accounts/domain/user';
import { PlayerAnswer } from '@modules/pair-quiz/game/domain/entites/player-answer.entity';

@Entity('PlayerProgress')
export class PlayerProgress {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    default: 0,
  })
  score: number;

  @ManyToOne(() => User, {
    eager: true,
    onDelete: 'CASCADE',
  })
  playerAccount: User;

  @OneToMany(() => PlayerAnswer, (answer) => answer.playerProgress, {
    cascade: true,
  })
  answers: PlayerAnswer[];
}
