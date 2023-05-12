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
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../item/item.entity';

@Entity()
export class Group {
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

  @ManyToMany(() => User)
  @ApiProperty({ type: () => User, isArray: true, default: [] })
  @JoinTable()
  users: User[];

  @OneToMany(() => Category, (category) => category.group)
  @ApiProperty({ type: () => Category, isArray: true, default: [] })
  categories: Category[];

  @OneToMany(() => Item, (item) => item.group)
  @ApiProperty({ type: () => Item, isArray: true, default: [] })
  items: Item[];
}
