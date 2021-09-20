import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from './base-time-entity';
import User from './user';

@Entity({ name: 'chatting' })
class Chatting extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 45 })
  chatting!: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user!: string;
}

export default Chatting;