import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateGroupDto {
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
}
