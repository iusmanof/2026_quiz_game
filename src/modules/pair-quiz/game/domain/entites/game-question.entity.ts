import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';
import { Question } from '@modules/pair-quiz/questions/domain/question.entity';

@Entity('GameQuestion')
export class GameQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, game => game.gameQuestions, {
    onDelete: 'CASCADE',
  })
  game: Game;

  @ManyToOne(() => Question)
  question: Question;

  @Column()
  order: number;
}