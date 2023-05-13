import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateItemDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({ type: String })
  @IsUUID()
  categoryId: string;
}
