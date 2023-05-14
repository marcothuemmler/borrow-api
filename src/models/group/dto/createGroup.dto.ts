import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ type: String, example: 'my-group' })
  @IsString()
  @Length(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, nullable: true, example: 'Group description' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    example: 'b0d3ff6a-fc7a-4f3c-bfb7-5db331a90889',
  })
  @IsUUID()
  creatorId: string;
}
