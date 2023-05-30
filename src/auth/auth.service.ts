import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/token.type';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<Tokens> {
    const user = await this.userService.create(signupDto);
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException();
    }
    const refreshTokenMatches = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new UnauthorizedException();
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.userService.update(userId, { hashedRefreshToken: null });
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordMatches = await argon2.verify(user.hash, loginDto.password);
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.accessTokenSecret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshTokenSecret,
        expiresIn: '7d',
      }),
    ]);
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hash = await argon2.hash(refreshToken);
    await this.userService.update(userId, { hashedRefreshToken: hash });
  }
}
