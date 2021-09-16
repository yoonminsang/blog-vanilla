import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user';

@Entity({ name: 'post' })
class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 40 })
  title!: string;

  @Column({ length: 15 })
  content!: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  userId!: string;
}

export default Post;
