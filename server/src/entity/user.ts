import { USER_ENTITY } from 'constants/entity';
import { Column, Entity, PrimaryColumn, Generated, OneToMany } from 'typeorm';
import { UUIdEntity } from './abstract-class/uuid-entity';
import Chatting from './chatting';
import Comment from './comment';
import Post from './post';

@Entity({ name: 'user' })
class User extends UUIdEntity {
  @PrimaryColumn({ type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true, length: USER_ENTITY.emailMaxLength })
  email!: string;

  @Column({ type: 'varchar', unique: true, length: USER_ENTITY.nicknameMaxLength })
  nickname!: string;

  @Column({ type: 'char', nullable: true, length: USER_ENTITY.hashPasswordLength })
  password!: string;

  @OneToMany(() => Post, post => post.user)
  posts!: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @OneToMany(() => Chatting, chatting => chatting.user)
  chattings!: Chatting[];
}

export default User;
