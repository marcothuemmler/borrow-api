import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../group/group.entity';
import { Item } from '../item/item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: String })
  @ApiProperty({ type: String })
  username: string;

  @Column({ type: String })
  @ApiProperty({ type: String })
  email: string;

  @ManyToMany(() => Group)
  @ApiProperty({ type: () => Group })
  groups: Group[];

  @OneToMany(() => Item, (item) => item.owner)
  @ApiProperty({ type: Item })
  items: Item[];
}
