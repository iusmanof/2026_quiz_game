import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlayerProgress } from '@modules/pair-quiz/game/domain/entites/player-progress.entity';

export enum AnswerStatus {
  Correct = 'Correct',
  Incorrect = 'Incorrect',
}

@Entity('PlayerAnswers')
export class PlayerAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionId: string;

  @Column({
    type: 'enum',
    enum: AnswerStatus,
  })
  answerStatus: AnswerStatus;

  @CreateDateColumn()
  addedAt: Date;

  @ManyToOne(() => PlayerProgress, (playerProgress) => playerProgress.answers)
  playerProgress: PlayerProgress;
}
