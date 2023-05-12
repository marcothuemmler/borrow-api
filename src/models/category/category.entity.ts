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
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: String })
  name: string;

  @ManyToOne(() => Group, (group: Group) => group.categories)
  @ApiProperty({ type: () => Group })
  group: Group;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];

  @TreeParent()
  @ApiProperty({ type: () => Category })
  parent: Category;

  @TreeChildren()
  @ApiProperty({ type: () => Category })
  children: Category[];
}
