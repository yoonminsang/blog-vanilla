import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user';
import Post from './post';
import { BaseTimeEntity } from './base-time-entity';

@Entity({ name: 'comment' })
class Comment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 45 })
  chatting!: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user!: string;

  @ManyToOne(() => Post, post => post.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  post!: string;
}

export default Comment;
