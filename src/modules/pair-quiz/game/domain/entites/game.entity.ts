import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerProgress } from '@modules/pair-quiz/game/domain/entites/player-progress.entity';
import { User } from '@user-accounts/domain/user';
import { Question } from '@modules/pair-quiz/questions/domain/question.entity';
import {
  AnswerStatus,
  PlayerAnswer,
} from '@modules/pair-quiz/game/domain/entites/player-answer.entity';
import { GameStatus } from '@modules/pair-quiz/game/domain/enums/game-status.enum';
import { GameResult } from '@modules/pair-quiz/game/domain/enums/game-result.enum';
import { GameQuestion } from '@modules/pair-quiz/game/domain/entites/game-question.entity';

@Entity('Game')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.PendingSecondPlayer,
  })
  status: GameStatus;

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

  // @ManyToMany(() => Question)
  // @JoinTable()
  // questions: Question[] | null;
  @OneToMany(() => GameQuestion, gq => gq.game, {
    cascade: true,
    eager: true,
  })
  gameQuestions: GameQuestion[];

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
    game.gameQuestions = [];

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

  // assignQuestions(questions: Question[]): void {
  //   this.questions = questions;
  //   console.log('----------assignQuestions-----------');
  //   console.log(this.questions);
  //   console.log('----------assignQuestions-----------');
  // }

  assignQuestions(questions: Question[]) {
    this.gameQuestions = questions.map((question, index) => {
      const gq = new GameQuestion();

      gq.game = this;
      gq.question = question;
      gq.order = index;

      return gq;
    });
  }

  private getOrderedQuestions(): Question[] {
    return (this.gameQuestions ?? [])
      .sort((a, b) => a.order - b.order)
      .map(gq => gq.question);
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
    // if (!this.questions?.length) {
    //   return null;
    // }
    //
    // const answeredQuestionIds = new Set(playerProgress.answers.map((a) => a.questionId));
    //
    // return this.questions.find((q) => !answeredQuestionIds.has(q.id)) ?? null;
    const questions = this.getOrderedQuestions();

    if (!questions.length) {
      return null;
    }

    const answeredQuestionIds = new Set(
      playerProgress.answers.map(a => a.questionId),
    );

    return questions.find(
      q => !answeredQuestionIds.has(q.id),
    ) ?? null;
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

  getResultForPlayer(userId: string): GameResult {
    if (!this.secondPlayerProgress) {
      throw new Error('Game has no second player');
    }

    const isFirstPlayer = this.firstPlayerProgress.playerAccount.id === userId;

    const player = isFirstPlayer ? this.firstPlayerProgress : this.secondPlayerProgress;

    const opponent = isFirstPlayer ? this.secondPlayerProgress : this.firstPlayerProgress;

    if (player.score > opponent.score) {
      return GameResult.Win;
    }

    if (player.score < opponent.score) {
      return GameResult.Lose;
    }

    return GameResult.Draw;
  }

  private tryFinishGame(): void {
    if (!this.secondPlayerProgress) return;

    // const questionsCount = this.questions?.length ?? 0;
    const questionsCount = this.gameQuestions?.length ?? 0;
    const firstFinished = this.firstPlayerProgress.answers.length === questionsCount;

    const secondFinished = this.secondPlayerProgress.answers.length === questionsCount;

    if (!firstFinished || !secondFinished) return;

    const firstCorrect = this.firstPlayerProgress.score > 0;
    const secondCorrect = this.secondPlayerProgress.score > 0;

    const firstAnswers = [...this.firstPlayerProgress.answers].sort(
      (a, b) => a.addedAt.getTime() - b.addedAt.getTime(),
    );

    const secondAnswers = [...this.secondPlayerProgress.answers].sort(
      (a, b) => a.addedAt.getTime() - b.addedAt.getTime(),
    );

    const firstLast = firstAnswers.at(-1)?.addedAt?.getTime();

    const secondLast = secondAnswers.at(-1)?.addedAt?.getTime();

    if (!firstLast || !secondLast) return;

    if (firstCorrect && firstLast < secondLast) {
      this.firstPlayerProgress.score += 1;
    } else if (secondCorrect && secondLast < firstLast) {
      this.secondPlayerProgress.score += 1;
    }
    this.status = GameStatus.Finished;
    this.finishGameDate = new Date();
  }
}
