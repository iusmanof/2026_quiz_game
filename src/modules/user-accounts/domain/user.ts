import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SessionEntity } from './session.entity';
import { UserEmailConfirmationEntity } from './user-email-confirmation.entity';
import {PlayerProgress} from "@modules/pair-quiz/game/domain/entites/player-progress.entity";

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  login: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  @OneToMany(() => UserEmailConfirmationEntity, (confirmation) => confirmation.user)
  emailConfirmations: UserEmailConfirmationEntity[];

  @OneToMany(() => PlayerProgress, (progress) => progress.playerAccount)
  playerProgress: PlayerProgress[];
}
