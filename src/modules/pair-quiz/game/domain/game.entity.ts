import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerProgress } from '@modules/pair-quiz/game/domain/player-progress.entity';
import { User } from '@user-accounts/domain/user';
import { Question } from '@modules/pair-quiz/questions/domain/question.entity';

export enum GameStatus {
  PendingSecondPlayer = 'PendingSecondPlayer',
  Active = 'Active',
  Finished = 'Finished',
}

@Entity('Game')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.PendingSecondPlayer,
  })
  status: string;

  @OneToOne(() => PlayerProgress, {
    cascade: true,
  })
  @JoinColumn()
  firstPlayerProgress: PlayerProgress;

  @OneToOne(() => PlayerProgress, {
    cascade: true,
  })
  @JoinColumn()
  secondPlayerProgress: PlayerProgress | null;

  @ManyToMany(() => Question)
  @JoinTable()
  questions: Question[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  pairCreatedDate: Date;

  @CreateDateColumn()
  startGameDate: Date;

  @CreateDateColumn()
  finishGameDate: Date;

  static createPendingGame(user: User): Game {
    const game = new Game();

    const firstPlayerProgress = new PlayerProgress();

    firstPlayerProgress.playerAccount = user;
    firstPlayerProgress.score = 0;
    firstPlayerProgress.answers = [];

    game.firstPlayerProgress = firstPlayerProgress;
    game.secondPlayerProgress = null;
    game.status = GameStatus.PendingSecondPlayer;

    return game;
  }

  connectSecondPlayer(user: User): void {
    const secondPlayerProgress = new PlayerProgress();

    secondPlayerProgress.playerAccount = user;
    secondPlayerProgress.score = 0;
    secondPlayerProgress.answers = [];

    this.secondPlayerProgress = secondPlayerProgress;

    this.status = GameStatus.Active;

    this.startGameDate = new Date();
  }
}
