import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ type: String, example: 'Item name' })
  @IsString()
  @Length(2)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, nullable: true, example: 'Item description' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    example: 'ab73e069-2e3f-4f68-8ba5-bdd30643e656',
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    type: String,
    example: 'bb06b99f-b090-4d86-9e3b-6d525726817e',
  })
  @IsUUID()
  groupId: string;

  @ApiProperty({
    type: String,
    example: 'b0d3ff6a-fc7a-4f3c-bfb7-5db331a90889',
  })
  @IsUUID()
  ownerId: string;
}
