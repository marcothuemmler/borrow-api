import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: String, example: 'username' })
  @IsString()
  @Length(3)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, example: 'user@example.com' })
  @IsEmail()
  email: string;
}
