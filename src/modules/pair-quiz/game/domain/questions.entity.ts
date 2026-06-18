import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Questions')
export class Questions {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  body: string;
}
