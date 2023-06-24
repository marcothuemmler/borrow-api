import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Group } from '../group/group.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Item {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AutoMap()
  @Column({ default: true })
  isActive: boolean;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ nullable: true })
  description: string;

  @AutoMap(() => Category)
  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @AutoMap(() => Group)
  @ManyToOne(() => Group, (group) => group.items, { onDelete: 'CASCADE' })
  group: Group;

  @AutoMap(() => User)
  @ManyToOne(() => User, (owner) => owner.items, { onDelete: 'CASCADE' })
  owner: User;

  @AutoMap()
  imageUrl: string;
}
