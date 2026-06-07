import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Questions')
export class Question {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  body: string;

  @Column('text', { array: true })
  correctAnswers: string[];
}
