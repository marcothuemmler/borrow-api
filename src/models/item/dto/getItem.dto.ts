import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { GetGroupDto } from '../../group/dto/getGroup.dto';
import { GetCategoryDto } from '../../category/dto/getCategory.dto';
import { GetUserDto } from '../../user/dto/getUser.dto';

export class GetItemDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    example: '90b1fb5f-1467-407e-8761-a66e922a39f8',
  })
  id: string;

  @AutoMap()
  @ApiProperty({ type: String, example: 'Item name' })
  name: string;

  @AutoMap()
  @ApiProperty({ type: String, nullable: true, example: 'Item description' })
  description: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    example: 'ab73e069-2e3f-4f68-8ba5-bdd30643e656',
  })
  category: GetCategoryDto;

  @AutoMap()
  @ApiProperty()
  group: GetGroupDto;

  @AutoMap()
  @ApiProperty()
  owner: GetUserDto;
}
