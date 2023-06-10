import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { ChatRoom } from '../chatroom.entity';
import { GetChatroomDto } from '../dto/get-chatroom.dto';

export class ChatroomProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, ChatRoom, GetChatroomDto);
    };
  }
}
