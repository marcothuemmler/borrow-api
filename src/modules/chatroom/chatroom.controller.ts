import { Controller, Get } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator';

@Controller('chats')
@ApiTags('Chats')
@ApiBearerAuth()
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Get()
  async findChatRooms(@GetCurrentUserId() id: string) {
    return this.chatroomService.findChatRooms(id);
  }
}
