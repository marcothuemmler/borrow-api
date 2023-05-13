import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(3)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  // minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1
  @ApiProperty({ type: String })
  @IsStrongPassword({ minSymbols: 0 })
  password: string;
}
