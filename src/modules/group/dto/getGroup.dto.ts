import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GetCategoryDto } from '../../category/dto/getCategory.dto';
import { GetUserDto } from '../../user/dto/getUser.dto';
import { GetItemDto } from '../../item/dto/getItem.dto';

export class GetGroupDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    example: 'bb06b99f-b090-4d86-9e3b-6d525726817e',
  })
  id: string;

  @AutoMap()
  @ApiProperty({ type: String, example: 'my-group' })
  name: string;

  @AutoMap()
  @ApiProperty({ type: String, nullable: true, example: 'Group description' })
  description: string;

  @ApiPropertyOptional({ type: String })
  imageUrl?: string;

  @AutoMap(() => [GetCategoryDto])
  @ApiPropertyOptional({ type: () => GetCategoryDto, isArray: true })
  categories: GetCategoryDto[];

  @AutoMap(() => [GetUserDto])
  @ApiPropertyOptional({ type: () => GetUserDto, isArray: true })
  members: GetUserDto[];

  @AutoMap(() => [GetItemDto])
  @ApiPropertyOptional({ type: () => GetItemDto, isArray: true })
  items: GetItemDto[];
}
