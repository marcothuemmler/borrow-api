import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user/user.module';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from '../common/guards/at.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    { provide: APP_GUARD, useClass: AtGuard },
  ],
  imports: [UserModule, JwtModule.register({})],
})
export class AuthModule {}
