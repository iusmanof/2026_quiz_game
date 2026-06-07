import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Questions')
export class Question {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  body: string;

  @Column('text', { array: true })
  correctAnswers: string[];

  @Column({ default: false })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
