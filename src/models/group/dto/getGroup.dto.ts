import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

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
}
