import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const newMessage = this.messageRepository.create(createMessageDto);
    newMessage.sender = await this.userRepository.findOneByOrFail({
      id: createMessageDto.senderId,
    });
    newMessage.recipient = await this.userRepository.findOneByOrFail({
      id: createMessageDto.recipientId,
    });
    const message = await this.messageRepository.save(newMessage);
    return {
      createdAt: message.created_at,
      senderId: message.sender.id,
      recipientId: message.recipient.id,
      content: message.content,
    };
  }

  async find(myId: string, otherId: string) {
    const messages = await this.messageRepository.find({
      where: [
        { sender: { id: myId }, recipient: { id: otherId } },
        { sender: { id: otherId }, recipient: { id: myId } },
      ],
      relations: ['recipient', 'sender'],
      order: { created_at: 'ASC' },
    });
    const messagesDto = [];
    for (const message of messages) {
      messagesDto.push({
        createdAt: message.created_at,
        senderId: message.sender.id,
        recipientId: message.recipient.id,
        content: message.content,
      });
    }
    return messagesDto;
  }
}
