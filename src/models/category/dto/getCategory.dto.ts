import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GetItemDto } from '../../item/dto/getItem.dto';

export class GetCategoryDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    example: 'ab73e069-2e3f-4f68-8ba5-bdd30643e656',
  })
  id: string;

  @AutoMap()
  @ApiProperty({ type: String, example: 'Category name' })
  name: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'Category description',
  })
  description: string;

  @AutoMap(() => GetCategoryDto)
  @ApiPropertyOptional()
  parent: GetCategoryDto | null;

  @AutoMap(() => [GetItemDto])
  @ApiPropertyOptional()
  items: GetItemDto[];
}
