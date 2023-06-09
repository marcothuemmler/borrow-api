import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Group } from '../group/group.entity';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { ItemProfile } from './profile/item.profile';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Group, Category, User]),
    StorageModule,
  ],
  controllers: [ItemController],
  providers: [ItemService, ItemProfile],
})
export class ItemModule {}
