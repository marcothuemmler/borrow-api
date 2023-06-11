import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ChatRoom } from './chatroom.entity';
import { Message } from '../message/message.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { GetChatroomDto } from './dto/get-chatroom.dto';

@Injectable()
export class ChatroomService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatroomRepository: Repository<ChatRoom>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectMapper()
    private readonly classMapper: Mapper,
  ) {}

  async findChatRooms(id: string) {
    const chatRooms = await this.chatroomRepository.findBy({
      id: ILike(`%${id}%`),
    });
    for (const chatRoom of chatRooms) {
      chatRoom.messages = await this.messageRepository.find({
        where: { room: { id: chatRoom.id } },
        order: { created_at: 'DESC' },
        relations: ['sender'],
        take: 1,
      });
    }
    return this.classMapper.mapArray(chatRooms, ChatRoom, GetChatroomDto);
  }
}
