import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../group/group.entity';
import { Item } from '../item/item.entity';

@Tree('materialized-path')
@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  name: string;

  @ManyToOne(() => Group, (group: Group) => group.categories)
  group: Group;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];
}
