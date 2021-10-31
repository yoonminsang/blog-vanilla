import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from './base-time-entity';

export abstract class AutoIdEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}
