import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Message } from '../message/message.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class ChatRoom {
  @AutoMap()
  @PrimaryColumn()
  id: string;

  @AutoMap(() => [Message])
  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
