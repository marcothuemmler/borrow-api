import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(3)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsStrongPassword({ minSymbols: 0 })
  password: string;
}
