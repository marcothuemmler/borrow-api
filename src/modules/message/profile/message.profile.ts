import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { GetMessageDto } from '../dto/get-message.dto';
import { Message } from '../message.entity';

export class MessageProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Message,
        GetMessageDto,
        forMember(
          (destination) => destination.createdAt,
          mapFrom((source) => source.created_at),
        ),
      );
    };
  }
}
