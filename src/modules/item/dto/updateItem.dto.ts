import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateItemDto {
  @ApiProperty({ type: String, example: 'Item name' })
  @IsString()
  @Length(3)
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
}
