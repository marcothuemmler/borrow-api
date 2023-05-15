import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ type: String, example: 'username' })
  @IsString()
  @Length(3)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, example: 'user@example.com' })
  @IsEmail()
  email: string;

  // minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1
  @ApiProperty({ type: String, example: 'Password123' })
  @IsStrongPassword({ minSymbols: 0 })
  password: string;
}
