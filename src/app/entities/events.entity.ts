// @ts-ignore : 'Column' is declared but its value is never read.
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';

import {User} from "./user.entity";
import {Actors} from "./actors.entity";

@Entity()
export class Events {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  title: string;

  @Column("text")
  location: string;

  @Column("date")
  date: Date;

  @Column("text")
  description: string;

  @Column("text")
  comments: string;

  @ManyToMany(type => Actors, actors => actors.events, {cascade: true})
  actors: Actors[];

  @ManyToOne(type => User, user => user.events)
  user: User;

}
