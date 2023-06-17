import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { GetGroupDto } from '../../group/dto/getGroup.dto';
import { GetItemDto } from '../../item/dto/getItem.dto';

export class GetUserDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    example: 'b0d3ff6a-fc7a-4f3c-bfb7-5db331a90889',
  })
  id: string;

  @AutoMap()
  @ApiProperty({ type: String, example: 'username' })
  username: string;

  @AutoMap()
  @ApiProperty({ type: String, example: 'user@example.com' })
  email: string;

  @AutoMap(() => [GetGroupDto])
  @ApiProperty({ type: () => GetGroupDto, isArray: true })
  groups: GetGroupDto[];

  @AutoMap(() => [GetItemDto])
  @ApiProperty({ type: () => GetItemDto, isArray: true })
  items: GetItemDto[];

  @AutoMap()
  imageUrl: string | undefined;
}
