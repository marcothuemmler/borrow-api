import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';
import { GetGroupDto } from '../../group/dto/getGroup.dto';
import { GetCategoryDto } from '../../category/dto/getCategory.dto';

export class GetItemDto {
  @AutoMap()
  @ApiProperty({ type: String })
  id: string;

  @AutoMap()
  @ApiProperty({ type: String })
  name: string;

  @AutoMap()
  @ApiProperty()
  description: string;

  @AutoMap()
  category: GetCategoryDto;

  @AutoMap()
  group: GetGroupDto;

  @AutoMap()
  @ApiProperty()
  owner: User;
}
