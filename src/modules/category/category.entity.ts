import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../group/group.entity';
import { Item } from '../item/item.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Category {
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

  @AutoMap(() => Group)
  @ManyToOne(() => Group, (group) => group.categories, {
    onDelete: 'CASCADE',
  })
  group: Group;

  @AutoMap(() => [Item])
  @OneToMany(() => Item, (item) => item.category)
  items: Item[];

  @AutoMap(() => Category)
  @ManyToOne(() => Category, (category) => category.children, {
    onDelete: 'SET NULL',
  })
  parent: Category | null;

  @AutoMap(() => [Category])
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
