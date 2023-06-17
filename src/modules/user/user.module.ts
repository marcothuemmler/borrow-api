import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserProfile } from './profile/user.profile';
import { StorageModule } from '../storage/storage.module';
import { Group } from '../group/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group]), StorageModule],
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [UserService],
})
export class UserModule {}
