import { Column, Entity, PrimaryColumn, Generated, OneToMany } from 'typeorm';
import { BaseTimeEntity } from './base-time-entity';
import Chatting from './chatting';
import Comment from './comment';
import Post from './post';

@Entity({ name: 'user' })
class User extends BaseTimeEntity {
  @PrimaryColumn({ type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true, length: 45 })
  email!: string;

  @Column({ type: 'varchar', length: 15 })
  nickname!: string;

  @Column({ type: 'char', nullable: true, length: 60 })
  password!: string;

  @OneToMany(() => Post, post => post.user)
  posts!: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => Chatting, chatting => chatting.user)
  chattings!: Chatting[];
}

export default User;
