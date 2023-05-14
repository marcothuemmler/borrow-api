import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateGroupDto {
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
}
