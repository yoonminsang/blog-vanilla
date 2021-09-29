import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';
import User from './user';
import { BaseTimeEntity } from './base-time-entity';

@Entity({ name: 'comment' })
class Comment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 45 })
  chatting!: string;

  @ManyToOne(() => User, user => user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user!: User;

  @RelationId((comment: Comment) => comment.user)
  userId!: string;

  @ManyToOne(() => Comment, post => post.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  post!: string;
}

export default Comment;
