import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Message } from '../message/message.entity';

@Entity()
export class ChatRoom {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
