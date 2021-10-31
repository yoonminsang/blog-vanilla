import { Generated, PrimaryColumn } from 'typeorm';
import { BaseTimeEntity } from './base-time-entity';

export abstract class UUIdEntity extends BaseTimeEntity {
  @PrimaryColumn({ type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;
}
