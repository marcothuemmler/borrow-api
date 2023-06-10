import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @CreateDateColumn()
  created_at: Date;

  @AutoMap()
  @ManyToOne(() => User)
  sender: User;

  @AutoMap()
  @ManyToOne(() => User)
  recipient: User;

  @AutoMap()
  @Column()
  content: string;
}
