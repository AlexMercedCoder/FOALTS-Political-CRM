import { controller, Get, render, TokenRequired, HttpResponseOK } from '@foal/core';
import { TypeORMStore } from '@foal/typeorm';

import { ApiController, AuthController } from './controllers';

export class AppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/auth', AuthController)
  ];




}
