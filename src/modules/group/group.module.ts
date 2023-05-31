import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { User } from '../user/user.entity';
import { GroupProfile } from './profile/group.profile';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User]), StorageModule],
  controllers: [GroupController],
  providers: [GroupService, GroupProfile],
})
export class GroupModule {}
