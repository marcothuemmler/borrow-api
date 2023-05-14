import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

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
}
