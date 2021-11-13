import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { AutoIdEntity } from './abstract-class/auto-id-entity';
import User from './user';

@Entity({ name: 'chatting' })
class Chatting extends AutoIdEntity {
  @Column({ length: 45 })
  chatting!: string;

  @ManyToOne(() => User, user => user.chattings, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @Column()
  userId!: string;
}

export default Chatting;
