// @ts-ignore : 'Column' is declared but its value is never read.
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

import {User} from "./user.entity";
import {Events} from "./events.entity";


@Entity()
export class Actors {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column()
  phone: number;

  @Column("text")
  email: string;

  @Column("text")
  address: string;

  @Column("text")
  city: string;

  @Column("text")
  state: string;

  @Column()
  zip: number;

  @Column()
  staff: boolean;

  @Column()
  volunteer: boolean;

  @Column()
  donor: boolean;

  @Column()
  media: boolean;

  @Column("text")
  comments: string;

  @ManyToMany(type => Events, events => events.actors)
  @JoinTable()
  events: Events[];

  @ManyToOne(type => User, user => user.actors)
  user: User;

}
