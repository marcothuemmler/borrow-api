import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    type: String,
    nullable: true,
    example: '7ad8e3ce-562f-42d4-83e3-fda370f940cd',
  })
  parent: GetCategoryDto | null;
}
