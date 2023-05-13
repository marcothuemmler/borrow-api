import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GetGroupDto {
  @AutoMap()
  @ApiProperty({ type: String })
  id: string;

  @AutoMap()
  @ApiProperty({ type: String })
  name: string;

  @AutoMap()
  @ApiProperty({ type: String, nullable: true })
  description: string;
}
