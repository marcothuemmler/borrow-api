import { AutoMap } from '@automapper/classes';
import { GetMessageDto } from '../../message/dto/get-message.dto';

export class GetChatroomDto {
  @AutoMap()
  id: string;

  @AutoMap(() => [GetMessageDto])
  messages: GetMessageDto[];
}
