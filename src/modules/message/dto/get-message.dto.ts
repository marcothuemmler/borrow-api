import { AutoMap } from '@automapper/classes';
import { GetUserDto } from '../../user/dto/getUser.dto';

export class GetMessageDto {
  @AutoMap()
  createdAt: Date;

  @AutoMap()
  sender: GetUserDto;

  @AutoMap()
  recipient: GetUserDto;

  @AutoMap()
  content: string;
}
