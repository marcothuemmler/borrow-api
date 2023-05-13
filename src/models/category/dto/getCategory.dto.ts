import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryDto {
  @AutoMap()
  @ApiProperty({ type: String })
  id: string;

  @AutoMap()
  @ApiProperty({ type: String })
  name: string;

  @AutoMap()
  @ApiProperty({ type: String })
  description: string;

  @AutoMap()
  @ApiProperty()
  parent: GetCategoryDto;
}
