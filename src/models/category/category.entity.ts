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

  @ManyToOne(() => Group, (group: Group) => group.categories)
  group: Group;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];

  @AutoMap()
  @ManyToOne(() => Category, (category) => category.children)
  parent: Category | null;

  @AutoMap()
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
