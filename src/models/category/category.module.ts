import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Group } from '../group/group.entity';
import { CategoryProfile } from './profile/category.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Group])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryProfile],
})
export class CategoryModule {}
