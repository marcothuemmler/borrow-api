import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Item } from '../item/item.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Group {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ nullable: true })
  description: string;

  @AutoMap()
  imageUrl: string;

  @AutoMap(() => [User])
  @ManyToMany(() => User, (user) => user.groups, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinTable({
    name: 'group_members',
    joinColumns: [{ name: 'groupId' }],
    inverseJoinColumns: [{ name: 'userId' }],
  })
  members: User[];

  @AutoMap(() => [Category])
  @OneToMany(() => Category, (category) => category.group)
  categories: Category[];

  @AutoMap(() => [Item])
  @OneToMany(() => Item, (item) => item.group)
  items: Item[];
}
