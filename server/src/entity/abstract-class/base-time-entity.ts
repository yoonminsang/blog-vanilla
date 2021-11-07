import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

// TODO: 이중 extends와 중복제거 어느것이 더 괜찮은 방법일까
export abstract class BaseTimeEntity {
  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}
