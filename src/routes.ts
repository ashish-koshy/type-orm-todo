import { UserController } from './controller/UserController';
import { RouteConfig } from './types';

export const Routes: RouteConfig[] = [
  {
    controller: UserController,
    route: '/users',
    method: 'get',
    action: 'all',
  },
  {
    controller: UserController,
    route: '/users',
    method: 'post',
    action: 'save',
  },
  {
    controller: UserController,
    route: '/users/:id',
    method: 'get',
    action: 'one',
  },
  {
    controller: UserController,
    route: '/users/:id',
    method: 'delete',
    action: 'remove',
  },
];
