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
import { AnswerStatus, PlayerAnswer } from '@modules/pair-quiz/game/domain/player-answer.entity';

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
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  firstPlayerProgress: PlayerProgress;

  @OneToOne(() => PlayerProgress, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  secondPlayerProgress: PlayerProgress | null;

  @ManyToMany(() => Question)
  @JoinTable()
  questions: Question[] | null;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  pairCreatedDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  startGameDate: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  finishGameDate: Date | null;

  static createPendingGame(user: User): Game {
    const game = new Game();

    const firstPlayerProgress = new PlayerProgress();

    firstPlayerProgress.playerAccount = user;
    firstPlayerProgress.score = 0;
    firstPlayerProgress.answers = [];

    game.firstPlayerProgress = firstPlayerProgress;
    game.secondPlayerProgress = null;
    game.status = GameStatus.PendingSecondPlayer;

    game.startGameDate = null;
    game.finishGameDate = null;
    game.questions = null;

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

  assignQuestions(questions: Question[]): void {
    this.questions = questions;
  }

  getPlayerProgress(userId: string): PlayerProgress | null {
    if (this.firstPlayerProgress.playerAccount.id === userId) {
      return this.firstPlayerProgress;
    }

    if (this.secondPlayerProgress && this.secondPlayerProgress.playerAccount.id === userId) {
      return this.secondPlayerProgress;
    }

    return null;
  }

  getNextQuestionForPlayer(playerProgress: PlayerProgress): Question | null {
    const nextQuestionIndex = playerProgress.answers.length;

    return this.questions?.[nextQuestionIndex] ?? null;
  }
  answerQuestion(playerProgress: PlayerProgress, question: Question, answer: string): PlayerAnswer {
    const isCorrect = question.correctAnswers.some(
      (correctAnswer) => correctAnswer.toLowerCase().trim() === answer.toLowerCase().trim(),
    );

    const playerAnswer = new PlayerAnswer();

    playerAnswer.questionId = question.id;
    playerAnswer.answerStatus = isCorrect ? AnswerStatus.Correct : AnswerStatus.Incorrect;
    playerAnswer.addedAt = new Date();

    playerProgress.answers.push(playerAnswer);

    if (isCorrect) {
      playerProgress.score += 1;
    }

    this.tryFinishGame();

    return playerAnswer;
  }

  private tryFinishGame(): void {
    if (!this.secondPlayerProgress) {
      return;
    }

    const firstPlayerFinished = this.firstPlayerProgress.answers.length === 5;

    const secondPlayerFinished = this.secondPlayerProgress.answers.length === 5;

    if (firstPlayerFinished && secondPlayerFinished) {
      this.status = GameStatus.Finished;
      this.finishGameDate = new Date();
    }
  }
}
