import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { AutoMap } from '@automapper/classes';
import { ChatRoom } from '../chatroom/chatroom.entity';

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

  @ManyToOne(() => ChatRoom, (room) => room.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  room: ChatRoom;
}
