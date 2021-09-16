import { Column, Entity, PrimaryColumn, Generated, OneToMany } from 'typeorm';
import Post from './post';

@Entity({ name: 'user' })
class User {
  @PrimaryColumn({ type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true, length: 45 })
  email!: string;

  @Column({ type: 'varchar', length: 15 })
  nickname!: string;

  @Column({ type: 'char', nullable: true, length: 60 })
  password!: string;

  @OneToMany(() => Post, post => post.userId)
  posts!: Post[];
}

export default User;
