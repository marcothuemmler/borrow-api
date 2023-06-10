import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ChatRoom } from './chatroom.entity';

@Injectable()
export class ChatroomService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatroomRepository: Repository<ChatRoom>,
  ) {}

  async findChatRooms(id: string) {
    return this.chatroomRepository.findBy({ id: ILike(`%${id}%`) });
  }
}
