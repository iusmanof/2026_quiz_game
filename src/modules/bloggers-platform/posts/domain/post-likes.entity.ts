import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostsEntity } from '@modules/bloggers-platform/posts/domain/post.entity';
import { User } from '@user-accounts/domain/user';
import type { LikeStatus } from '@modules/bloggers-platform/posts/types/like-status.type';

@Entity('PostLikes')
export class PostLikesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  postId: string;

  @ManyToOne(() => PostsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: PostsEntity;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar' })
  status: LikeStatus;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;
}
