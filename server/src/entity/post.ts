import { POST_ENTITY } from 'constants/entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseTimeEntity } from './base-time-entity';
import Comment from './comment';
import User from './user';

@Entity({ name: 'post' })
class Post extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: POST_ENTITY.titleMaxLength })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @ManyToOne(() => User, user => user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user!: User;

  @RelationId((post: Post) => post.user)
  userId!: string;

  @OneToMany(() => Comment, comment => comment.post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  posts!: Post[];
}

export default Post;
