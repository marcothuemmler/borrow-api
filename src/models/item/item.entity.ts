import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../category/category.entity';
import { Group } from '../group/group.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @ApiProperty({ type: String })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String })
  description: string;

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @ManyToOne(() => Group, (group) => group.items)
  group: Group;

  @ManyToOne(() => User, (owner) => owner.items)
  owner: User;
}
