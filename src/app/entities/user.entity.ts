import { hashPassword } from '@foal/core';
import { Column, Entity, PrimaryGeneratedColumn , OneToMany} from 'typeorm';

import {Actors} from "./actors.entity";
import {Events} from "./events.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  async setPassword(password: string) {
    this.password = await hashPassword(password); }

  @OneToMany(type => Actors, actors => actors.user)
  actors: Actors[];

  @OneToMany(type => Events, events => events.user)
  events: Events[];


}
