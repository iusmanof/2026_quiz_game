import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerAnswer } from '@modules/pair-quiz/game/domain/player-answer.entity';
import { UsersEntity } from '@user-accounts/domain/users.entity';

@Entity('PlayerProgress')
export class PlayerProgress {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    default: 0,
  })
  score: number;

  @ManyToOne(() => UsersEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  playerAccount: UsersEntity;

  @OneToMany(() => PlayerAnswer, (answer) => answer.playerProgress, {
    cascade: true,
  })
  answers: PlayerAnswer[];
}
