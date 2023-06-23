import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GetCategoryDto } from '../../category/dto/getCategory.dto';
import { GetUserDto } from '../../user/dto/getUser.dto';
import { GetGroupDto } from '../../group/dto/getGroup.dto';

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

  @AutoMap(() => GetCategoryDto)
  @ApiPropertyOptional({ type: () => GetCategoryDto })
  category: GetCategoryDto;

  @AutoMap(() => GetGroupDto)
  @ApiPropertyOptional({ type: () => GetGroupDto })
  group: GetGroupDto;

  @AutoMap(() => GetUserDto)
  @ApiPropertyOptional({ type: () => GetUserDto })
  owner: GetUserDto;

  @AutoMap()
  @ApiProperty()
  isActive: boolean;

  @ApiPropertyOptional({ type: String })
  imageUrl?: string;
}
