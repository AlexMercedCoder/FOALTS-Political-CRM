import {
  Context, Delete, Get, HttpResponseCreated, HttpResponseNoContent,
  HttpResponseNotFound, HttpResponseOK, Post, Put, TokenRequired, ValidateBody, dependency, HttpResponseRedirect, removeSessionCookie,
  Session, setSessionCookie, verifyPassword, ValidateParams
} from '@foal/core';

import { fetchUser,TypeORMStore } from '@foal/typeorm';

import { getRepository } from 'typeorm';

import { Actors } from '../entities';
import { Events } from '../entities';
import { User } from '../entities';

@TokenRequired({
  cookie: true,
  store: TypeORMStore,
  // Make ctx.user be an instance of User.
  user: fetchUser(User),
})
export class ApiController {

///////////////////////
// Actor Routes
//////////////////////

  @Get('/actors')
  async getActors(ctx: Context) {
    const Actor = await getRepository(Actors).find({ user: ctx.user });
    return new HttpResponseOK(Actor);
  }

  @Post('/actors')
  @ValidateBody({

  additionalProperties: false,
  properties: {

    name: { type: 'string' },
    phone: { type: 'number' },
    email: { type: 'string' },
    address: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zip: { type: 'number' },
    staff: { type: 'boolean' },
    volunteer: { type: 'boolean' },
    donor: { type: 'boolean' },
    media: { type: 'boolean' },
    comments: { type: 'string' }

  },
  // The property "text" is required.
  required: [ 'name' ],
  type: 'object',
  })
  async postActors(ctx: Context) {
    const Actor = new Actors();
    Actor.name = ctx.request.body.name;
    Actor.phone = ctx.request.body.phone;
    Actor.email = ctx.request.body.email;
    Actor.address = ctx.request.body.address;
    Actor.city = ctx.request.body.city;
    Actor.state = ctx.request.body.state;
    Actor.zip = ctx.request.body.zip;
    Actor.staff = ctx.request.body.staff;
    Actor.volunteer = ctx.request.body.volunteer;
    Actor.donor = ctx.request.body.donor;
    Actor.media = ctx.request.body.media;
    Actor.comments = ctx.request.body.comments;
    // Make the current user the user of the todo.
    Actor.user = ctx.user;

    await getRepository(Actors).save(Actor);

    return new HttpResponseCreated(Actor);
  }

  @Delete('/actors/:id')
  @ValidateParams({
    properties: {
      id: { type: 'number' }
    },
    type: 'object',
  })
  async deleteActor(ctx: Context) {
    const Actor = await getRepository(Actors).findOne({
      id: (ctx.request.params as any).id,
      // Do not return the todo if it does not belong to the current user.
      user: ctx.user
    });
    if (!Actor) {
      return new HttpResponseNotFound();
    }
    await getRepository(Actors).remove(Actor);
    return new HttpResponseNoContent();
  }

  @Put('/actors/:id')
  @ValidateBody({

  additionalProperties: false,
  properties: {

    name: { type: 'string' },
    phone: { type: 'number' },
    email: { type: 'string' },
    address: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zip: { type: 'number' },
    staff: { type: 'boolean' },
    volunteer: { type: 'boolean' },
    donor: { type: 'boolean' },
    media: { type: 'boolean' },
    comments: { type: 'string' }

  },
  // The property "text" is required.
  required: [ 'name' ],
  type: 'object',
  })
  @ValidateParams({
    properties: {
      id: { type: 'number' }
    },
    type: 'object',
  })
  async editActor(ctx: Context) {
    const Actor = await getRepository(Actors).findOne({
      id: (ctx.request.params as any).id,
      // Do not return the todo if it does not belong to the current user.
      user: ctx.user
    });
    if (!Actor) {
      return new HttpResponseNotFound();
    }
    Actor.name = ctx.request.body.name;
    Actor.phone = ctx.request.body.phone;
    Actor.email = ctx.request.body.email;
    Actor.address = ctx.request.body.address;
    Actor.city = ctx.request.body.city;
    Actor.state = ctx.request.body.state;
    Actor.zip = ctx.request.body.zip;
    Actor.staff = ctx.request.body.staff;
    Actor.volunteer = ctx.request.body.volunteer;
    Actor.donor = ctx.request.body.donor;
    Actor.media = ctx.request.body.media;
    Actor.comments = ctx.request.body.comments;
    // Make the current user the user of the todo.
    Actor.user = ctx.user;

    await getRepository(Actors).save(Actor);
    return new HttpResponseNoContent();
  }

  ///////////////////////
  // Event Routes
  //////////////////////

    @Get('/events')
    async getEvents(ctx: Context) {
      const Event = await getRepository(Events).find({ user: ctx.user });
      return new HttpResponseOK(Event);
    }

    @Post('/events')
    @ValidateBody({

    additionalProperties: false,
    properties: {

      title: { type: 'string' },
      location: { type: 'number' },
      date: { type: 'date' },
      description: { type: 'string' },
      comments: { type: 'string' },

    },
    // The property "text" is required.
    required: [ 'title' ],
    type: 'object',
    })
    async postEvents(ctx: Context) {
      const Event = new Events();
      Event.title = ctx.request.body.title;
      Event.location = ctx.request.body.location;
      Event.date = ctx.request.body.date;
      Event.description = ctx.request.body.description;
      Event.comments = ctx.request.body.comments;
      // Make the current user the user of the todo.
      Event.user = ctx.user;

      await getRepository(Events).save(Event);

      return new HttpResponseCreated(Event);
    }

    @Delete('/events/:id')
    @ValidateParams({
      properties: {
        id: { type: 'number' }
      },
      type: 'object',
    })
    async deleteEvent(ctx: Context) {
      const Event = await getRepository(Events).findOne({
        id: (ctx.request.params as any).id,
        // Do not return the todo if it does not belong to the current user.
        user: ctx.user
      });
      if (!Event) {
        return new HttpResponseNotFound();
      }
      await getRepository(Events).remove(Event);
      return new HttpResponseNoContent();
    }

    @Put('/events/:id')
    @ValidateBody({

    additionalProperties: false,
    properties: {

        title: { type: 'string' },
        location: { type: 'number' },
        date: { type: 'date' },
        description: { type: 'string' },
        comments: { type: 'string' }

    },
    // The property "text" is required.
    required: [ 'title' ],
    type: 'object',
    })
    @ValidateParams({
      properties: {
        id: { type: 'number' }
      },
      type: 'object',
    })
    async editEvent(ctx: Context) {
      const Event = await getRepository(Events).findOne({
        id: (ctx.request.params as any).id,
        // Do not return the todo if it does not belong to the current user.
        user: ctx.user
      });
      if (!Event) {
        return new HttpResponseNotFound();
      }
      Event.title = ctx.request.body.title;
      Event.location = ctx.request.body.location;
      Event.date = ctx.request.body.date;
      Event.description = ctx.request.body.description;
      Event.comments = ctx.request.body.comments;
      // Make the current user the user of the todo.
      Event.user = ctx.user;

      await getRepository(Events).save(Event);
      return new HttpResponseNoContent();
    }

}
