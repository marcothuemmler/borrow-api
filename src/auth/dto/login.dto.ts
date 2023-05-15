import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, example: 'user@example.com' })
  @IsEmail()
  email: string;

  // minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1
  @ApiProperty({ type: String, example: 'Password123' })
  @IsStrongPassword({ minSymbols: 0 })
  password: string;
}
