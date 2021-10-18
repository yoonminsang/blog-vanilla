import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseTimeEntity } from './base-time-entity';
import User from './user';

@Entity({ name: 'chatting' })
class Chatting extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 45 })
  chatting!: string;

  @ManyToOne(() => User, user => user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user!: User;

  @RelationId((chatting: Chatting) => chatting.user)
  userId!: string;
}

export default Chatting;
