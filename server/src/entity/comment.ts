import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { COMMENT_ENTITY } from '@/constants/entity';
import User from './user';
import Post from './post';
import { AutoIdEntity } from './abstract-class/auto-id-entity';

@Entity({ name: 'comment' })
class Comment extends AutoIdEntity {
  @Column({ length: COMMENT_ENTITY.contentMaxLength })
  content!: string;

  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @Column({ type: 'char', length: 36 })
  userId!: string;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post!: Post;

  @Column()
  postId!: number;
}

export default Comment;
