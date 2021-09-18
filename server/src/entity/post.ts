import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseTimeEntity } from './base-time-entity';
import Comment from './comment';
import User from './user';

@Entity({ name: 'post' })
class Post extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 40 })
  title!: string;

  @Column({ length: 15 })
  content!: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user!: string;

  @OneToMany(() => Comment, comment => comment.post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  posts!: Post[];
}

export default Post;
