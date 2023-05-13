import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(2)
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

  @ApiProperty({ type: String })
  @IsUUID()
  groupId: string;

  @ApiProperty({ type: String })
  @IsUUID()
  ownerId: string;
}
