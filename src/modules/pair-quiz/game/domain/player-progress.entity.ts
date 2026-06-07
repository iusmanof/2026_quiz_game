import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@user-accounts/domain/user';
import { Game } from '@modules/pair-quiz/game/domain/game.entity';

@Entity('PlayerProgress')
export class PlayerProgress {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ManyToOne(() => User)
  playerAccount: User;

  @ManyToOne(() => Game)
  game: Game;
}
