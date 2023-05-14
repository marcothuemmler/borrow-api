import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: String, example: 'Category name' })
  @IsString()
  @Length(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'Category description',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    example: 'bb06b99f-b090-4d86-9e3b-6d525726817e',
  })
  @IsUUID()
  groupId: string;

  @ApiProperty({
    type: String,
    nullable: true,
    example: '7ad8e3ce-562f-42d4-83e3-fda370f940cd',
  })
  @IsUUID()
  @IsOptional()
  parentCategoryId: string;
}
