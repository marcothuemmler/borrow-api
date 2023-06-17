import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Group } from '../group/group.entity';
import { Item } from '../item/item.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AutoMap()
  @Column({ type: String })
  username: string;

  @AutoMap()
  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String })
  hash: string;

  @Column({ type: String, nullable: true })
  hashedRefreshToken: string | null;

  @AutoMap(() => [Group])
  @ManyToMany(() => Group, (group) => group.members, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'group_members',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'groupId' }],
  })
  groups: Group[];

  @AutoMap()
  imageUrl: string;

  @AutoMap(() => [Item])
  @OneToMany(() => Item, (item) => item.owner)
  items: Item[];
}
