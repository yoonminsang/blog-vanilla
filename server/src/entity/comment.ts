import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';
import { COMMENT_ENTITY } from 'constants/entity';
import { BaseTimeEntity } from './base-time-entity';
import User from './user';

@Entity({ name: 'comment' })
class Comment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: COMMENT_ENTITY.contentMaxLength })
  content!: string;

  @ManyToOne(() => User, user => user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user!: User;

  @RelationId((comment: Comment) => comment.user)
  userId!: string;

  @ManyToOne(() => Comment, post => post.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  post!: string;
}

export default Comment;
